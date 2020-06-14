<?php

namespace App\Http\Controllers;

use App\Grade;
use App\Paper;
use App\Subject;
use App\User;
use App\UserGrade;
use App\UserSubject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function studentRegister(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|unique:users',
            'password' => 'required',
            'role_id' => 'required',
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['msg' => 'Fails']);
        }
        $user = $request->all();
        $user['password'] = bcrypt($request->input('password'));
        User::create($user);


        return response()->json(['msg' => 'Success', 'user' => $user]);

    }

    public function teacherRegister(Request $request)
    {
        $sucess = true;
        $validator = Validator::make($request->all(), [
            'email' => 'required|unique:users',
            'password' => 'required',
            'role_id' => 'required',
            'name' => 'required',
            'grades' => 'required',
            'subjects' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['msg' => 'All fields are required']);
        }

        DB::beginTransaction();
        try {
            $user = $request->all();
            $user['password'] = bcrypt($request->input('password'));
            $newUser = User::create($user);

            $grades = $request->input('grades');
            foreach ($grades as $grade) {
                $g = new UserGrade();
                $g->user_id = $newUser->id;
                $g->grade_id = $grade;
                $g->user_id_grade_id = $newUser->id . "and" . $grade;
                $g->save();
            }

            $subjects = $request->input('subjects');
            foreach ($subjects as $sub) {
                $s = new UserSubject();
                $s->user_id = $newUser->id;
                $s->subject_id = $sub;
                $s->user_id_subject_id = $newUser->id . "and" . $sub;
                $s->save();
            }
        } catch (\Exception $e) {
            $sucess = false;
            DB::rollBack();
        }

        if ($sucess === true) {
            DB::commit();
            return response()->json(['msg' =>'success','user'=> $newUser]);
        } else {
            return response()->json(['msg' => 'err']);
        }


    }

    public function login(Request $request)
    {
//        return $request;
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['msg' => 'Fails']);
        }
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Authentication passed...
            return response()->json(['msg' => 'Authorized', 'user' => Auth::user()]);
        } else {
            return response()->json(['msg' => 'Unauthorized']);
        }

    }

    public function getSubjects()
    {
        $subjects = Subject::all();
        return response()->json($subjects);
    }

    public function getSubjectsById($id){

        $qry='select * from subjects , user_subjects where user_subjects.user_id = ? and user_subjects.subject_id=subjects.id';
        $results=DB::select($qry,array(
            0=>$id
        ));
        return response()->json($results);
    }

    public function getGradesById($id){

        $qry='select * from grades , user_grades where user_grades.user_id = ? and user_grades.grade_id=grades.id
';
        $results=DB::select($qry,array(
            0=>$id
        ));
        return response()->json($results);
    }

    public function getGrades()
    {
        $grades = Grade::all();
        return response()->json($grades);
    }


    public function getUserPapers($id){

        $qry='select grades.grade_number as grade, subjects.name as sub, papers.* from grades,subjects,papers where papers.user_id= ? and papers.subject_id=subjects.id and papers.grade_id=grades.id order by(papers.created_at) desc ';
        $results=DB::select($qry,array(
            0=>$id
        ));
        return response()->json($results);
    }
}
