const Http = new XMLHttpRequest();
const url='http://localhost/webassignment/backend/product/GetAllProduct.php';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
    if(Http.response){
        let res = JSON.parse(Http.response)['data'];
        console.log(res);
        let content = '';
        res.forEach(product => {
            content += `<div class="card">
                            <div class="card-image">
                                <img class = "image" src="${product['Path']}" alt="pc img">
                            </div>
                            <div class="card-text">
                                <h2>${product['Description']}</h2>
                                <p>i3-9100F/8GB/250GB SSD/GeForce GTX 1660 Super/Free DOS</p>
                            </div>
                            <div class="card-stats">
                                <p>14.000.000 vnd</p>
                            </div>
                        </div>`;
        });
        let container = document.getElementById('content');
        container.innerHTML = content;
    }
}