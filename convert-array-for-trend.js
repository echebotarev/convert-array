function convert(arr) {
    let resultArr = [];
    let firstItem,
        secondItem,
        firstNumber = true;

    for (let i = 0; i < arr.length; i++) {
        //обработка последнего элемента полученного массива
        if (arr.length == (i + 1) && firstNumber) {
            firstItem = parseInt(arr[i]);

            let a = [];
            a.push(firstItem);

            resultArr.push(a);
            continue;
        }

        // Записываем первый элемент если следующий больше на единицу
        if (parseInt(arr[i + 1]) - parseInt(arr[i]) == 1 && firstNumber) {
            firstItem = parseInt(arr[i]);
            firstNumber = false;

            continue;
        }

        //записываем второй элемент, если следующий больше чем на единицу и есть первый элемент
        if (parseInt(arr[i + 1]) - parseInt(arr[i]) != 1 && !firstNumber) {
            secondItem = parseInt(arr[i]);
            firstNumber = true;

            // делаем проверку диапазона
            if (secondItem - firstItem != 1) {
                let a = [];
                a.push(firstItem);
                a.push(secondItem);

                resultArr.push(a);
            }
            else {
                let a = [];
                let b = [];

                a.push(firstItem);
                b.push(secondItem);

                resultArr.push(a);
                resultArr.push(b);
            }

            continue;
        }

        //обработка с первого элемента полученного массива
        if (parseInt(arr[i + 1]) - parseInt(arr[i]) != 1 && firstNumber && i == 0) {
            firstItem = parseInt(arr[i]);

            let a = [];
            a.push(firstItem);

            resultArr.push(a);

            continue;
        }

        // обработка отдельно стоящего элемента внутри полученного массива
        if (parseInt(arr[i + 1]) - parseInt(arr[i]) != 1 && firstNumber && i != 0) {
            firstItem = parseInt(arr[i]);

            let a = [];
            a.push(firstItem);

            resultArr.push(a);
        }
    }

    return returnString(resultArr)
}

function returnString(arr) {
    var a = [];

    arr.forEach(item => {
        if (item.length == 1) {
            a.push(String(item[0]));
        }

        if (item.length > 1) {
            a.push(`${String(item[0])}-${String(item[1])}`);
        }
    });

    return a.join(',')
}

module.exports = convert;