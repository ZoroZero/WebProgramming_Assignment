<?php

namespace Core\Http;

/**
 * 
 * Class Route
 * 
 */
class Route
{


    private $__routes;

    public function __construct()
    {
        $this->__routes = [];
    }


    public function get(string $url, $action)
    {
        // Xử lý phương thức GET
        $this->__request($url, 'GET', $action);
    }


    public function post(string $url, $action)
    {
        // Xử lý phương thức POST
        $this->__request($url, 'POST', $action);
    }


    private function __request(string $url, string $method, $action)
    {
        // kiem tra xem URL co chua param khong. VD: post/{id}
        if (preg_match_all('/({([a-zA-Z]+)})/', $url, $params)) {
            $url = preg_replace('/({([a-zA-Z]+)})/', '(.+)', $url);
            // printf($params);
        }

        // Thay the tat ca cac ki tu / bang ky tu \/ (regex) trong URL.
        $url = str_replace('/', '\/', $url);

        $route = [
            'url' => $url,
            'method' => $method,
            'action' => $action,
            'params' => $params[2]
        ];
        array_push($this->__routes, $route);
    }


    public function map(string $url, string $method)
    {
        // Lặp qua các route trong ứng dụng, kiểm tra có chứa url được gọi không
        foreach ($this->__routes as $route) {

            // nếu route có $method
            if ($route['method'] == $method) {
                $reg = '/^' . $route['url'] . '/';

                if (preg_match($reg, $url, $params)) {
                    $this->__call_action_route($route['action'], $params);
                    return;
                }
            }
        }

        echo '404 - Not Found';
        return;
    }

    private function __call_action_route($action, $params)
    {
        if (is_callable($action)) {
            call_user_func_array($action, $params);
            return;
        }

        if (is_string($action)) {
            $action = explode('@', $action);
            $controller_name = 'App\\Controllers\\' . $action[0];
            $controller = new $controller_name();
            call_user_func_array([$controller, $action[1]], $params);
            return;
        }
    }
}
