(function() {
    var btn = document.querySelector('input[type="submit"]');
    btn.addEventListener('click', sendArr);
}());

function sendArr(e) {
    e.preventDefault();
    var input = document.querySelector('input[type="text"]');

    var obj = {};
    obj.arr = input.value.split(',');
    obj = JSON.stringify(obj);

    ajax(obj).then(
        function(response) {
            var li = document.createElement('li');
            li.innerHTML = response;

            document.getElementById('result').appendChild(li);
            console.log(response);
        }
    );

    function ajax(arr) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();

            xhr.open('POST', '/' + arr, true);

            xhr.addEventListener('load', function() {
                if (xhr.status != 200) {
                    alert('Сбой на сервере');
                } else {
                    resolve(xhr.responseText);
                }
            });

            xhr.send();
        })
    }
}