$(document).ready(function() {
    $(document).on('keyup', 'input[id^="pins-"]', function(){
        let value = parseInt(this.value);
        if (value > 15) {
                Toastify({
                    text: "Vous ne pouvez pas saisir un nombre supérieur à 15.",
                    duration:3000, // Durée d'affichage en millisecondes
                    gravity: "top", // Position du toast (top, bottom, center)
                    backgroundColor: "linear-gradient(to right, #FF5733, #C70039)", // Couleur de fond
                }).showToast();
            // Si la valeur est supérieure à 15, réinitialiser à 15
            this.value = 15;
        }

    });

    $(document).on('click','#load_player', function(){
        let player = $("#player").val();
        getplayer(player);
    });

    // Configuration globale de jQuery AJAX
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

const addpoint = (element) => {
    const player = element.dataset.parameter;
    const value = $("#pins-" + player).val();
    let frameNumber;
    let sumPrev = 0;

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
            if (value == 15 && i % 3 == 1) {
                td.html('X');
            }else if(value == 15 && frameNumber == 5){
                td.html('X')
            } else {
                td.html(value);
            }

            let sumPrevTd = (typeof prevTd2.html() !== 'undefined' &&
                                prevTd2.html() != "  " && prevTd2.html() != "/") ?
                                    parseInt(prevTd.html()) + parseInt(prevTd2.html()) :
                                    parseInt(prevTd.html())

            let sum = parseInt(td.html()) + sumPrevTd;
            if(sum > 15){
                Toastify({
                    text: "Il ne devrait pas y avoir plus de 15 quilles touchées dans une Frame.",
                    duration:3000,
                    gravity: "top",
                    backgroundColor: "linear-gradient(to right, #FF5733, #C70039)",
                }).showToast();
                td.html('')
                return true
            }

            if (!isNaN(sum) && sum === 15 && nextTd2.length && i % 3 != 1 && frameNumber != 5) {
                td.html('/');
                if(i < 13 && i % 3 == 2)
                    nextTd1.html("  ");
            }

            if (td.html() === 'X' && nextTd1.length && nextTd2.length && i < 13 && frameNumber != 5) {
                nextTd1.html("  ");
                nextTd2.html("  ");
            }
            if (i % 3 == 0) {
               sumPrev = sum
            }else if(sum == 15){
                sumPrev = 15
            }

            if (i % 3 == 0)
                getTotalFrame(sumPrev,frameNumber,player)
            break; // Sortir de la boucle après avoir traité une cellule
        }
    }
    $("#pins-" + player).val('')
};

const getTotalFrame = (sumPrev,frameNumber,player) => {

    total1 = parseInt(getTotalValueHTML(player,frameNumber - 2))
    sum = (frameNumber -1 != 1) ?
            sumPrev + total1:
            sumPrev;

    if(!isNaN(sum) && sum != 0)
        setTotalHTML(player, frameNumber -1,sum);

}
