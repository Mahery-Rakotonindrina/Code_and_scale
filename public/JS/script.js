const totalPins = 15
$(document).ready(function() {
    $(document).on('keyup', 'input[id^="pins-"]', function(){
        this.value = this.value.replace(/\D/g, '');
        let value = parseInt(this.value);
        if (value > totalPins) {
                Toastify({
                    text: "Vous ne pouvez pas saisir un nombre supérieur à 15.",
                    duration:3000,
                    gravity: "top",
                    backgroundColor: "linear-gradient(to right, #FF5733, #C70039)",
                }).showToast();
            // Si la valeur est supérieure à 15, réinitialiser à 15
            this.value = totalPins;
        }

    });

    $(document).on('click','#load_player', function(){
        let player = $("#player").val();
        getplayer(player);
    });

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
});

const getplayer = (number) => {
    $.ajax({
        type: 'POST',
        url: '/table',
        data: {player:number},
        data_type: 'json',
        success: (result) => {
            $("#table").html(result.table)
        }
    })

    }
const getPlayerCellValue = (player, cellNumber) => $(`#player-${player}-${cellNumber}`);
const setCellHTML = (player, cellNumber, value) => $(`#player-${player}-${cellNumber}`).html(value);
const setTotalHTML = (player, cellNumber, value) => $(`#total_player-${player}-${cellNumber}`).html(value);
const getTotalValueHTML = (player, cellNumber) => $(`#total_player-${player}-${cellNumber}`).html();

const addPoint = (element) => {
    const player = element.dataset.parameter;
    const value = $("#pins-" + player).val();
    let frameNumber;
    let array = []

    for (let i = 1; i <= 16; i++) {
        let td = $("#player-" + player + "-" + i);
        let prevTd  = getPlayerCellValue(player, i - 1);
        let prevTd2 = getPlayerCellValue(player, i - 2);
        let nextTd1 = getPlayerCellValue(player, i + 1);
        let nextTd2 = getPlayerCellValue(player, i + 2);

        // Détermination du numéro de Frame
        switch (true) {
            case (i < 3):
                frameNumber = 1;
                break;
            case (i >= 3 && i < 6):
                frameNumber = 2;
                break;
            case (i >= 6 && i < 9):
                frameNumber = 3;
                break;
            case (i >= 9 && i < 12):
                frameNumber = 4;
                break;
            default:
                frameNumber = 5;
        }

        $("#frame_number-" + player).val(frameNumber);
        $("#start_number-" + player).val(i+1 == 17 ? 'Jeu terminé' : i+1)

        // Traitement des cellules
        if (td.html() === "") {
            if ((value == totalPins && i % 3 == 1) ||
                (value == totalPins && frameNumber == 5)) {
                td.html('X');
            } else {
                td.html(value);
            }

            let sumPrevTd = (typeof prevTd2.html() !== 'undefined' &&
                                prevTd2.html() != "  " && prevTd2.html() != "/") ?
                                    parseInt(prevTd.html()) + parseInt(prevTd2.html()) :
                                    parseInt(prevTd.html())

            let sum = parseInt(td.html()) + sumPrevTd;


            if (!isNaN(sum) && sum === totalPins &&
                    i % 3 != 1
                    && frameNumber != 5) {
                td.html('/');
                if(i < 13 && i % 3 == 2)
                    nextTd1.html("  ");
                    i= i+1
                    frameNumber = frameNumber+1
            }

            if (td.html() === 'X' && nextTd1.length && nextTd2.length && i < 13 && frameNumber != 5) {
                nextTd1.html("  ");
                nextTd2.html("  ");
                i = i +2
                frameNumber = frameNumber+1
            }

            if(frameNumber == 5){
                td.attr('data-value', value);
            }

            let array_value = []
            if(i%3 == 0){
                array_value = [prevTd2.html(),prevTd.html(),td.html()]
                const spare = '/';
                const strike = 'X';
                if (array_value.includes(spare) || array_value.includes(strike)) {
                    getTotalFrameWithStyle(array_value, frameNumber, player);
                } else {
                    getTotalFrameNormal(array_value, frameNumber, player);
                }
                $(`#total_player-${player}-${frameNumber - 1}`).attr('data-frame', JSON.stringify(array_value));
                getBonusPoint(player,frameNumber)
            }

            // if(i%3 == 0)
            break; // Sortir de la boucle après avoir traité une cellule
        }
    }
    for(let j = 13; j<=16; j++ ){
        let val = getPlayerCellValue(player,j)
        val = val.html()
        array.push(parseInt(val))
        let searchStrike = 'X';
        let index = array.indexOf(searchStrike);

        // Vérifier si la valeur a été trouvée
        if (index !== -1) {
            // Remplacer la valeur dans l'array
            let newVal = totalPins;
            array[index] = newVal;
        }

        if(j == 16){
            if(isNaN(parseInt(array[3])))
                array[3] = 0
            sum = parseInt(array[0]) + parseInt(array[1]) + parseInt(array[2] + parseInt(array[3]))
            let total1 = parseInt(getTotalValueHTML(player,4))
            sum = sum + total1
            setTotalHTML(player, 5,sum);
        }
    }
    $("#pins-" + player).val('')
};

const getTotalFrameNormal = (frame,frameNumber,player) => {
    let sum = parseInt(frame[0]) + parseInt(frame[1]) + parseInt(frame[2])
    let total1 = parseInt(getTotalValueHTML(player,frameNumber - 2))
    sum = (frameNumber -1 != 1) ?
            sum + total1:
            sum;

    if(frameNumber == 5) setTotalHTML(player, frameNumber,sum);
    if(!isNaN(sum) && sum != 0){
            setTotalHTML(player, frameNumber -1,sum);
    }
}

const getTotalFrameWithStyle = (frame,frameNumber,player) => {
    if(frameNumber == 5) {
        let searchStrike = 'X';
        let index = frame.indexOf(searchStrike);
        if (index !== -1) {
            frame[index] =totalPins ;
            getTotalFrameNormal(frame,frameNumber,player)
        }
    }
    let sum = totalPins
    let total1 = parseInt(getTotalValueHTML(player,frameNumber - 2))
    if(!isNaN(total1)){
        sum = (frameNumber -1 != 1) ?
            sum + total1:
            sum;
    }
    if(!isNaN(sum) && sum != 0)
    setTotalHTML(player, frameNumber -1,sum);
}

const getBonusPoint = (player, frameNumber) => {
    let frames = $(`#total_player-${player}-${frameNumber - 1}`).attr('data-frame');
    let frames1 = $(`#total_player-${player}-${frameNumber - 2}`).attr('data-frame');
    let totalframe1 = $(`#total_player-${player}-${frameNumber - 2}`).html();
    let totalStrike;
    let totalSpare;

    // Vérifiez si frames1 est défini avant de l'utiliser
    if (frames1 !== undefined && frames1.includes('X')) {
        let result = JSON.parse(frames);
        let result1 = JSON.parse(frames1);
        let cell4;

        if (result.includes('X')) {
            let index = result.indexOf('X');
            if (index !== -1) {
                let newVal = totalPins;
                result[index] = newVal;
            }
        }

        cell4 = frameNumber == 5 ?
            parseInt(result[3]):
            0;

        totalStrike = parseInt(totalframe1) + parseInt(result[0]) + parseInt(result[1]) + parseInt(result[2]);
        result1 = totalStrike + parseInt(result[0]) + parseInt(result[1]) + parseInt(result[2]);
        setTotalHTML(player, frameNumber - 2, totalStrike);
        setTotalHTML(player, frameNumber - 1, result1);
    } else if (frames1 && frames1.includes('/')) { // Vérifiez si frames1 est défini et s'il contient '/'
        totalSpare = parseInt(totalframe1) + parseInt(result[0]) + parseInt(result[1]);
        result1 = totalSpare + parseInt(result[0]) + parseInt(result[1]) + parseInt(result[2]);
        setTotalHTML(player, frameNumber - 2, totalSpare);
        setTotalHTML(player, frameNumber - 1, result1);
    }
}

