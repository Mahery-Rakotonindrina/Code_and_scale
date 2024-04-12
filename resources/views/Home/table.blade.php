
@for ($i = 1; $i <= $player; $i++)
<div class="row">
    <div class="row">
        <label for="staticEmail" class="col-sm-2 col-form-label">Joueur numero : </label>
        <div class="col-sm-10">
            <input type="text" readonly="" class="form-control-plaintext" id="player_number-{{ $i }}" value="{{ $i }}">
        </div>
    </div>

    <div class="row">
        <label for="staticEmail" class="col-sm-2 col-form-label">Frame numero : </label>
        <div class="col-sm-10">
            <input type="text" readonly="" class="form-control-plaintext" id="frame_number-{{ $i }}" value="">
        </div>
    </div>

    <div class="row">
        <label for="staticEmail" class="col-sm-2 col-form-label">Lancer numero : </label>
        <div class="col-sm-10">
            <input type="text" readonly="" class="form-control-plaintext" id="start_number-{{ $i }}" value="">
        </div>
    </div>

    <div class="row">
        <label for="staticEmail" class="col-sm-3 col-form-label">Nombre de quilles touchées : </label>
        <div class="col-sm-4">
            <input type="text" class="form-control" id="pins-{{ $i }}" value="">
        </div>
        <div class="col-sm-3">
            <btn class="btn btn-success" id="add_point" onclick="addPoint(this)" data-parameter="{{ $i }}">Ajouter</btn>
        </div>
    </div>
    <table class="table table-bordered table-hover mt-4 col-sm-5" style="border-color: green;" id="table-{{ $i }}">
        <thead class="center text-center">
            <th colspan="3">1</th>
            <th colspan="3">2</th>
            <th colspan="3">3</th>
            <th colspan="3">4</th>
            <th colspan="3">5</th>
            <th colspan="3"></th>
        </thead>
        <tbody>
            @for ($j = 1; $j <= 18; $j++)
                <td id="player-{{ $i }}-{{ $j }}" class="fixed-column center text-center" data-value=""></td>
            @endfor
        </tbody>
        <tfoot class="center text-center">
            @for ($k = 1; $k <= 4; $k++)
                <td colspan="3" id="total_player-{{ $i }}-{{ $k }}" data-frame=""></td>

            @endfor
            <td colspan="4" id="total_player-{{ $i }}-5" data-frame=""></td>
            <td colspan="2"></td>
        </tfoot>
    </table>
</div>
@endfor

