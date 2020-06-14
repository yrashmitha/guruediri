<?php

namespace App\Http\Controllers;

use App\Grade;
use Illuminate\Http\Request;

class HomePage extends Controller
{
    //

    public function getGrades()
    {
        $res=Grade::all();
        return response()->json($res);
    }
}
