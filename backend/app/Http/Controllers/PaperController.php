<?php

namespace App\Http\Controllers;

use App\Paper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PaperController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $success = true;

        DB::beginTransaction();


        //inserting paper
        try {
            $paper = new Paper();
            $user_id = $request->input('user_id');
            $title = $request->input('title');
            $description = $request->input('description');
            $isPaper = $request->input('isPaper');
            $grade = $request->input('grade');
            $subject = $request->input('subject');
            $paper->title = $title;
            $paper->user_id = $user_id;
            $paper->description = $description;
            $paper->isPaper = $isPaper;
            $paper->grade_id = $grade;
            $paper->subject_id = $subject;

//            return $request->file('file');


            if ($request->files->count()>0){
                $path = $request->file('file')->store('public/papers');
                $realPath = explode('/', $path, 2)[1];
                $paper->path = $realPath;
                $paper->save();
            }



        } catch (\Exception $e) {

            return response()->json(['msg' => $e->getMessage()]);
            DB::rollback();

            $success = false;

        }

        if ($success) {
            DB::commit();
            return response()->json(['msg' => 'Uploaded successfully'], 200);
        } else {
            return response()->json(['msg' => 'Upload failed.'], 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $paper=Paper::find($id);
        $path=$paper->path;
        $deletePath='public/'.$path;
        Storage::delete($deletePath);
        $pp=$paper->delete();
        return response()->json($pp);
    }

    public function getGradedPapers($id)
    {
        $qry="select papers.* ,users.name from papers,users where papers.grade_id = ? and papers.isPaper=1 and papers.user_id=users.id order by(papers.created_at) desc";
        $res=DB::select($qry,array(
            0=>$id
        ));
        return response()->json($res);
    }

    public function getGradedTutes($id)
    {
        $qry="select papers.* ,users.name from papers,users where papers.grade_id = ? and papers.isPaper=0 and papers.user_id=users.id order by(papers.created_at) desc";
        $res=DB::select($qry,array(
            0=>$id
        ));
        return response()->json($res);
    }

    public function Download(Request $request)
    {
        $name= $request->input('fileName');
        //PDF file is stored under project/public/download/info.pdf

        $file= public_path(). "/storage/papers/".$name;



        $headers = [

            'Content-Type' => 'application/pdf',

        ];



        return response()->download($file, 'filename.pdf', $headers);
    }
}
