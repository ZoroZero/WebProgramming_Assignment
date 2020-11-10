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
                            <div class="inner">
                                <img class = "card-image image" src="${product["Path"]}" alt="pc img">
                            </div>
                            
                            <div class="card-body card_body">
                                <h2 class="card-title text-center">${product['Name']}</h2>
                                <p class="card-text card_info">i3-9100F/8GB/250GB SSD/GeForce GTX 1660 Super/Free DOS</p>
                                
                                <div class="card_footer">
                                    <div class="card-stats">
                                        <p class="card_money">${formatNumber(product['Price'])} vnd</p>
                                    </div>
                                    <a href="#" class="btn btn-primary card_button btn-sm">More Detail</a>
                                </div>
                            </div>
                        </div>`;
        });
        let container = document.getElementById('content');
        if(container){
            container.innerHTML = content;
        }
    }
}


function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }