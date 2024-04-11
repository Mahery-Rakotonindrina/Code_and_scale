$(document).ready(

    $(document).on('click','#load_player', function(){
        let player = $("#player").val();
        getplayer(player);
    })


)
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
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

const addpoint = (element) => {
    const player = element.dataset.parameter;
    const value = $("#pins-" + player).val();
    let frameNumber;

    for (let i = 1; i <= 16; i++) {
        const td = $("#player-" + player + "-" + i);
        const prevTd  = getPlayerCellValue(player, i - 1);
        const nextTd1 = getPlayerCellValue(player, i + 1);
        const nextTd2 = getPlayerCellValue(player, i + 2);

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
        $("#start_number-" + player).val(i+1)

        // Traitement des cellules
        if (td.html() === "") {
            if ((typeof prevTd.html() === 'undefined' || prevTd.html() === "  ") && value == 15) {
                td.html('X');
            } else {
                td.html(value);
            }

            const sum = parseInt(td.html()) + parseInt(prevTd.html());
            if (!isNaN(sum) && sum === 15 && nextTd2.length && i % 3 != 1) {
                td.html('/');
                if(i < 13 )
                    nextTd1.html("  ");
            }

            if (td.html() === 'X' && nextTd1.length && nextTd2.length && i < 13 ) {
                nextTd1.html("  ");
                nextTd2.html("  ");
            }

            break; // Sortir de la boucle après avoir traité une cellule
        }
    }
};
