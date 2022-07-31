function layDuLieu() {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetAll',
        method: 'GET',
    })

    promise.then(function (result) {
        console.log(result.data);
        renderProduct(result.data);

    })

    promise.catch(function (error) {
        console.log(error);
    })
}

window.onload = function () {
    layDuLieu();
}

function renderProduct(arrProduct) {
    var html = '';
    for (var i = 0; i < arrProduct.length; i++) {
        var product = arrProduct[i];
        html += `
            <tr>
                <td>${product.id}</td>
                <td><img src="${product.img}" width="100" height="100"/></td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.description}</td>
                <td>${product.type}</td>
                <td>
                    <button class="fa-solid fa-pen-to-square btn btn-primary" onclick="suaProduct('${product.id}')"></button>
                    <button class="fa-solid fa-trash-can btn btn-danger mt-1"  onclick="xoaProduct('${product.id}')"></button>
                </td>
            </tr>
        `;

    }

    document.querySelector('#tableProduct').innerHTML = html;
}

document.querySelector('#btnCreate').onclick = function () {
    var createProduct = new Product();
    createProduct.id = document.querySelector('#id').value;
    createProduct.img = document.querySelector('#image').value;
    createProduct.name = document.querySelector('#name').value;
    createProduct.price = document.querySelector('#price').value;
    createProduct.description = document.querySelector('#productDescription').value;
    createProduct.type = document.querySelector('#productType').value;


    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/CreateProduct',
        method: 'POST',
        data: createProduct,
    })
    promise.then(function (result) {
        console.log(result.data);
        layDuLieu();
    })
    promise.catch(function (error) {
        console.log(error);
    })

}

function xoaProduct(idClick) {
    alert(idClick);
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/DeleteProduct/' + idClick,
        method: 'DELETE',

    })
    promise.then(function (result) {
        console.log(result.data);
        layDuLieu();
    })
    promise.catch(function (error) {
        console.log(error);
    })
}

function suaProduct(idClick) {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetById/' + idClick,
        method: 'GET',
    })
    promise.then(function (result) {
        console.log(result.data);
        var product = result.data;
        document.querySelector('#id').value = product.id;
        document.querySelector('#image').value = product.img;
        document.querySelector('#name').value = product.name;
        document.querySelector('#price').value = product.price;
        document.querySelector('#productDescription').value = product.description;
        document.querySelector('#productType').value = product.type;
    })
    promise.then(function (error) {
        console.log(error);
    })
}

document.querySelector('#btnUpdate').onclick = function () {
    var productUpdate = new Product();
    productUpdate.id = document.querySelector('#id').value;
    productUpdate.img = document.querySelector('#image').value;
    productUpdate.name = document.querySelector('#name').value;
    productUpdate.price = document.querySelector('#price').value;
    productUpdate.description = document.querySelector('#productDescription').value;
    productUpdate.type = document.querySelector('#productType').value;
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/UpdateProduct/' + productUpdate.id,
        method: 'PUT',
        data: productUpdate,
    })
    promise.then(function (result) {
        console.log(result.data);
        layDuLieu();
    })
    promise.catch(function (error) {
        console.log(error);
    })
}
