<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="CSS/style.css">
    <link rel="stylesheet" href="CSS/bootstrap.css">
    <link rel="stylesheet" href="CSS/bootstrap.min.css">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <script src="JS/jquery-3.7.1.min.js"></script>
    <script src="JS/script.js"></script>

    <title>code & scale test</title>
</head>
<body>
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Code & Scale Test</a>
        </div>
    </nav>

    <div class="container-fluid position-relative pt-5 wow fadeInUp" data-wow-delay="0.1s" style="z-index: 1;">
        <div class="container row">
            <div class="col-sm-8 mb-4">
                <label for="exampleSelect1" class="form-label mt-4">Choisissez le nombre de joueur :</label>
                <select class="form-select col-sm-1" id="player">
                    <option value="1">1 Joueur</option>
                    <option value="2">2 Joueur</option>
                    <option value="3">3 Joueur</option>
                    <option value="4">4 Joueur</option>
                    <option value="5">5 Joueur</option>
                </select>
                <btn class="btn btn-success mt-2 col-sm-2" id="load_player">Lancer</btn>
            </div>
            <div id="table">

            </div>
        </div>
    </div>
</body>
</html>
