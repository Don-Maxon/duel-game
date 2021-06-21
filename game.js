let gamer_cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
let ai_cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

let gamer_points = 0
let ai_points = 0
let round_number = 1// нечетные - атакует игрок, четные атакует ии
let round_point = 1//индекс атакующего, 1 => атакует игрок, 2 => атакует ии


//задаем начальные данные для табло
let round_div = document.getElementById("round")
round_div.innerHTML = "раунд номер: " + String(round_number) + "(вы атакующий)";

//возможные варианты игрока
let gamer_cards_div = document.getElementById("gamer_cards_div")
gamer_cards_div.innerHTML = gamer_cards;


//штрафные быллы
let gamer_points_div = document.getElementById("gamer_points")
gamer_points_div.innerHTML = "ваши штрафные очки: " + String(gamer_points);
let ai_points_div = document.getElementById("ai_points")
ai_points_div.innerHTML = "штрафные очки опонента: " + String(ai_points);

//шаг игрока
let gamer_choice_div = document.getElementById("gamer_choice")
//шаг ии
let ai_choice_div = document.getElementById("ai_choice")

let gamer_attacks_button = document.getElementById("gamer_attacks_button")// "атакует" => игрок ходит первый

let reboot_button = document.getElementById("reboot")

function aiChoiceGeneratorProtection(array){//генерируем ход ии, когда он "зашишается"
    let average = 0 //среднее массива 
    let average_index //индекс первого число, которое равно или больше среднего арифметического
    let random_array = []//массив значений которые находяться примерно в середине массива карт ии

    average = array.length / 2

    for (let index = 0; index < array.length; index++) {
        if (index >= average){
            average_index = index
            break
        }
    }

    //генерируем массив из которого потом будем выбирать итоговое значение
    if(array.length >= 3){//ситуация когда осталось три и более карт
        random_array = [array[average_index-1], array[average_index], array[average_index+1]]
    }
    else if(array.length == 2){//ситуация когда осталось две карты
        random_array = [array[average_index-1], array[average_index]]
    }
    else{//ситуация когда осталась одна карта
        return array[0], 0
    }

    let rand = Math.floor(Math.random() * random_array.length);
    let rand_index = array.indexOf(random_array[rand], 0)
    return [random_array[rand], rand_index]

}

function aiChoiceGeneratorAttack(array){//генерируем ход ии, когда он "атакует"
    //изначально выберем будем мы искать max или min эл-ты
    let array_choice = [true, false]//true == max, false == min
    let rand = Math.floor(Math.random() * array_choice.length);
    if(array_choice[rand]){//max
        let random_array = []
        
        if(array.length > 3){//ситуация когда более трех карт
            random_array = [array[array.length-3], array[array.length-2], array[array.length-1]]//выбрали три макисмальных значения массива
        }
        else if (array.length == 3 || array.length == 2){//ситуация когда осталось две или три карты
            random_array = [array[array.length-1]]//выбрали макисмальное значение массива
        }
        else{//ситуация когда осталась одна карта
            return [array[0], 0]
        }
        
        let rand = Math.floor(Math.random() * random_array.length);
        let rand_index = array.indexOf(random_array[rand], 0)
        return [random_array[rand], rand_index]
        

    } 
    else{//min
        let random_array = []
        
        if(array.length > 3){//ситуация когда более трех карт
            random_array = [array[0], array[1], array[2]]//выбрали три макисмальных значения массива
        }
        else if (array.length == 3 ){//ситуация когда осталось три карты
            random_array = [array[0], array[1]]//выбрали два макисмальных значения массива
        }
        else{//ситуация когда осталась одна или две карта
            return [array[0], 0]
        }
        
        let rand = Math.floor(Math.random() * random_array.length);
        let rand_index = array.indexOf(random_array[rand], 0)
        return [random_array[rand], rand_index]
        
    }


}

reboot_button.addEventListener('click', function(){
    //обновляем данные для новой партии
    gamer_cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    ai_cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    gamer_points = 0
    ai_points = 0
    round_number = 1// нечетные - атакует игрок, четные атакует ии
    round_point = 1
    //прописываем заново все вводные в их дивы(для новой партии)
    //шаг игрока
    let gamer_choice_div = document.getElementById("gamer_choice")
    //шаг ии
    let ai_choice_div = document.getElementById("ai_choice")
    round_div.innerHTML = "раунд номер: " + String(1) + "(вы атакующий)"
    gamer_cards_div.innerHTML = gamer_cards;
    gamer_points_div.innerHTML = "ваши штрафные очки: " + String(gamer_points)
    ai_points_div.innerHTML = "штрафные очки опонента: " + String(ai_points)
    gamer_choice_div.innerHTML = ''
    ai_choice_div.innerHTML = ''


})

gamer_attacks_button.addEventListener('click', function(){//обработчик событий который вызывает основную функцию
    let gamer_attacks_input = document.getElementById('gamer_attacks_input')
    let gamer_namber = Number(gamer_attacks_input.value) //введенное число
    if(gamer_cards.includes(gamer_namber, 0)){//проверка на корректный ввод
        let gamer_index_nuber = gamer_cards.indexOf(gamer_namber)//индекс числа в массиве gamer_cards(карты игрока)
        
        //генирируем ход ии
        let ai_namber = 0
        let ai_index_number = 0
        if(round_point == 1){//ии выдаст "среднее" число если атакует игрок"
            let ai_result_mass  = aiChoiceGeneratorProtection(ai_cards)
            ai_namber = ai_result_mass[0]
            ai_index_number = ai_result_mass[1]
            
        }
        else{//ии выдаст "max" или "min" число если атакует ии"
            let ai_result_mass  = aiChoiceGeneratorAttack(ai_cards)
            ai_namber = ai_result_mass[0]
            ai_index_number = ai_result_mass[1]
        }

        //выводим "ставку" ии и игрока
        gamer_choice_div.innerHTML ="вы поставили: " + gamer_namber;
        ai_choice_div.innerHTML = "ваш опонент поставил: " + ai_namber;
       
        if(gamer_namber > ai_namber && round_point == 1) {// у игрока оказалось больше число и это ход, когда он "атакует"
            ai_points += gamer_namber - ai_namber
        }

        if(ai_namber > gamer_namber && round_point == 2) {// у ии оказалось больше число и это ход, когда ии "атакует"
            gamer_points += ai_namber - gamer_namber
        }
        //выводим баллы
        gamer_points_div.innerHTML = "ваши штрафные очки: " + String(gamer_points);
        ai_points_div.innerHTML = "штрафные очки опонента: " + String(ai_points);
        
        //удаляем использованные числа из массивов
        gamer_cards.splice(gamer_index_nuber, 1); 
        ai_cards.splice(ai_index_number, 1);
        gamer_cards_div.innerHTML = gamer_cards;
        gamer_cards_div.innerHTML = gamer_cards;

        //обновляем счетчик раунда 
        round_number += 1
        //очищаем поле ввода для следующего раунда 
        gamer_attacks_input.value = " "

        //прописываем ситуацию когда закончился финальный раунд(т.е. произошло 12 ходов)
        if(round_number == 13){
            if(gamer_points > ai_points){
                setTimeout(() => alert('вы проиграли :('), 2000);
                
            }
            else if(ai_points > gamer_points){
                setTimeout(() => alert('вы выиграли  :)'), 2000);
                
            }
            else{
                setTimeout(() => alertalert('ничья :|'), 2000);
                
            }
            gamer_cards_div.innerHTML = '-';
            return
            }
        
        //устанавливаем статус игрока в следующем раунде
        if(round_point == 1){
            round_div.innerHTML = "раунд номер: " + String(round_number) + " (вы защищаетесь) ";
            round_point = 2
        }
        else{
            round_div.innerHTML = "раунд номер: " + String(round_number) + " (вы атакующий) ";
            round_point = 1
        }
        
    }
    else{
        alert('некорректный ввод данных, выберете число из предоставленного ряда или начните новю игру')
    }
    
})







