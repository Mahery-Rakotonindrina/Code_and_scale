<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;

class CodeController extends Controller
{
    private $data;
    public function index(){
        return view('Home/index');
    }

    public function getPlayer(Request $req){
        $this->data['player'] = $req->get('player');
        $viewContent = View::make('Home/table',$this->data)->render();
        return response()->json([
            'success'=> 'true',
            'table'=> $viewContent
       ]);
    }
}
