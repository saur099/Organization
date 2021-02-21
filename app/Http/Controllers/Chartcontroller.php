<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
class Chartcontroller extends Controller
{
    public function getdatafordoughnut()
    {
        $asthma = DB::table('patient_reg as pr')->where('pr.asthma', "!=", "")
            ->select(DB::raw("COUNT(id) as totalpatient"))
            ->first();
        $asthma->lable = "Asthma";

        // dd($asthma);

        $common_cold = DB::table('patient_reg as pr')->where('pr.common_cold', "!=", "")
            ->select(DB::raw("COUNT(id) as totalpatient"))
            ->first();
        $common_cold->lable = "Common Cold";

        $nasal_blockage = DB::table('patient_reg as pr')->where('pr.nasal_blockage', "!=", "")
            ->select(DB::raw("COUNT(id) as totalpatient"))
            ->first();
        $nasal_blockage->lable = "Nasal Blockage";

        $sneezing_single_multiple = DB::table('patient_reg as pr')->where('pr.sneezing_single_multiple', "!=", "")
            ->select(DB::raw("COUNT(id) as totalpatient"))
            ->first();

        $sneezing_single_multiple->lable = "Sneezing Multiple Times";

        $cough = DB::table('patient_reg as pr')->where('pr.cough', "!=", "")
            ->select(DB::raw("COUNT(id) as totalpatient"))
            ->first();

        $cough->lable = "Cough";
        // dd();
        $doughnutdata = ["data" => ["labels" => [$asthma->lable, $common_cold->lable, $nasal_blockage->lable, $sneezing_single_multiple->lable, $cough->lable, ], "datasets" => [["data" => [$asthma->totalpatient, $common_cold->totalpatient, $nasal_blockage->totalpatient, $sneezing_single_multiple->totalpatient, $cough->totalpatient], "backgroundColor" => ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc'], ]]], "message" => "successfully recieved data"];

        // dd($doughnutdata);
        return response()
            ->json(['success' => true, 'response' => $doughnutdata], 200);
    }

    public static function barchartdata()
    {


        $totalpatients = DB::table('patient_reg as pg')
                        ->select(DB::raw('COUNT(pg.id) as totalreg') , DB::raw('MONTHNAME(pg.created_at) as month'))
                        ->groupBy('month')
                        ->orderBy('month')
                        ->get();
                        
        // $morethan4dayperweek = DB::table('patient_reg as pg')->where('pg.symptoms_last', 'More than 4 day per week')
        // //->select('pg.*')
        
        //     ->select(DB::raw('COUNT(pg.id) as totalreg') , DB::raw('MONTHNAME(pg.created_at) as month'))
        //     ->groupBy('month')
        //     ->orderBy('month')
        //     ->get();

        // $morethan4weeksastreach = DB::table('patient_reg as pg')->where('pg.symptoms_last', 'More than 4 week at a stretch')
        // //->select('pg.*')
        
        //     ->select(DB::raw('COUNT(pg.id) as totalreg') , DB::raw('MONTHNAME(pg.created_at) as month'))
        //     ->groupBy('month')
        //     ->orderBy('month')
        //     ->get();
        //  dd($morethan4weeksastreach);
        $barchartsingledata = $totalpatients;
       // dd($barchartsingledata);
        // $barchartdata = [$morethan4dayperweek, $morethan4weeksastreach];

        return response()->json(['success' => true, 'response' => $barchartsingledata], 200);
    }




    public static function filterchart(Request $request){

        // dd($request->all());
        
       
        $asthma = DB::table('patient_reg');
        $common_cold = DB::table('patient_reg');
        $nasal_blockage = DB::table('patient_reg');
        $sneezing_single_multiple = DB::table('patient_reg');
        $cough = DB::table('patient_reg');

        $age = $request->input('age');
        if (!empty($age)) {
            $age_arr = explode (",", $age);  
            // dd($age_arr);
            
            $asthma->whereRaw("age > $age_arr[0]");
            $asthma->whereRaw("age < $age_arr[1]");
            $common_cold->whereRaw("age > $age_arr[0]");
            $common_cold->whereRaw("age < $age_arr[1]");
            $nasal_blockage->whereRaw("age > $age_arr[0]");
            $nasal_blockage->whereRaw("age < $age_arr[1]");
            $sneezing_single_multiple->whereRaw("age > $age_arr[0]");
            $sneezing_single_multiple->whereRaw("age < $age_arr[1]");
            $cough->whereRaw("age > $age_arr[0]");
            $cough->whereRaw("age < $age_arr[1]");
        }

        $ordering_physician = $request->input('ordering_physician');
        if (!empty($ordering_physician)) {
            $asthma->where('ordering_physician', $ordering_physician);
            $common_cold->where('ordering_physician', $ordering_physician);
            $nasal_blockage->where('ordering_physician', $ordering_physician);
            $sneezing_single_multiple->where('ordering_physician', $ordering_physician);
            $cough->where('ordering_physician', $ordering_physician);
        }

        $state = $request->input('state');

        if (!empty($state)) {
            $asthma->where('state', $state);
            $common_cold->where('state', $state);
            $nasal_blockage->where('state', $state);
            $sneezing_single_multiple->where('state', $state);
            $cough->where('state', $state);
        }

        $city = $request->input('city');

        if (!empty($city)) {
            $asthma->where('city', $city);
            $common_cold->where('city', $city);
            $nasal_blockage->where('city', $city);
            $sneezing_single_multiple->where('city', $city);
            $cough->where('city', $city);
        }

        $gender = $request->input('gender');

        if (!empty($gender)) {
            $asthma->where('gender', $gender);
            $common_cold->where('gender', $gender);
            $nasal_blockage->where('gender', $gender);
            $sneezing_single_multiple->where('gender', $gender);
            $cough->where('gender', $gender);
        }



      
         $asthmadata = $asthma->where('asthma', "!=", "")
         ->select(DB::raw("COUNT(id) as totalpatient"))
         ->first();
         $asthmadata->lable = "Asthma";

         $common_colddata = $asthma->where('common_cold', "!=", "")
         ->select(DB::raw("COUNT(id) as totalpatient"))
         ->first();
         $common_colddata->lable = "Common Cold";

         $nasal_blockagedata = $asthma->where('nasal_blockage', "!=", "")
         ->select(DB::raw("COUNT(id) as totalpatient"))
         ->first();
         $nasal_blockagedata->lable = "Nasal Blockage";

         $sneezing_single_multipledata = $asthma->where('sneezing_single_multiple', "!=", "")
         ->select(DB::raw("COUNT(id) as totalpatient"))
         ->first();
         $sneezing_single_multipledata->lable = "Sneezing Multiple Times";

         $coughdata = $asthma->where('cough', "!=", "")
         ->select(DB::raw("COUNT(id) as totalpatient"))
         ->first();
         $coughdata->lable = "Cough";

         //dd($registrations);
        

         $doughnutdata = [
            "labels" => [$asthmadata->lable, $common_colddata->lable, $nasal_blockagedata->lable, $sneezing_single_multipledata->lable, $coughdata->lable],
            "dataset" => [$asthmadata->totalpatient, $common_colddata->totalpatient, $nasal_blockagedata->totalpatient, $sneezing_single_multipledata->totalpatient, $coughdata->totalpatient],
            "backgroundColor" => ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc']
         ];
             
       
        $barchartdata = Chartcontroller::filterforbarchart($request);
        $symptopmbarchartdata = Chartcontroller::filterforsymptopmsbarchart($request);


        $finaldata = ["doughnut" => $doughnutdata, "barchartdata"=>$barchartdata, 'symptompbarchart'=> $symptopmbarchartdata];
        
       // dd($barchartdata, $doughnutdata);

       return response()->json(['success' => true, 'response' => $finaldata], 200);
    }


    public static function filterforbarchart(Request $request){
        $morethan4dayperweek = DB::table('patient_reg');
        $morethan4weeksastreach = DB::table('patient_reg');
        $totalpatient = DB::table('patient_reg');

        $age = $request->input('age');
        if (!empty($age)) {
            $age_arr = explode (",", $age);  
            // dd($age_arr);
            $morethan4dayperweek->whereRaw("age > $age_arr[0]");
            $morethan4dayperweek->whereRaw("age < $age_arr[1]");

            $morethan4weeksastreach->whereRaw("age > $age_arr[0]");
            $morethan4weeksastreach->whereRaw("age < $age_arr[1]");

            $totalpatient->whereRaw("age > $age_arr[0]");
            $totalpatient->whereRaw("age < $age_arr[1]");
        }

        $ordering_physician = $request->input('ordering_physician');
        if (!empty($ordering_physician)) {
            $morethan4dayperweek->where('ordering_physician', $ordering_physician);
            $morethan4weeksastreach->where('ordering_physician', $ordering_physician);
            //for total patient
            $totalpatient->where('ordering_physician', $ordering_physician);
        }

        $state = $request->input('state');

        if (!empty($state)) {
            $morethan4dayperweek->where('state', $state);
            $morethan4weeksastreach->where('state', $state);

            $totalpatient->where('state', $state);
        }

        $city = $request->input('city');

        if (!empty($city)) {
            $morethan4dayperweek->where('city', $city);
            $morethan4weeksastreach->where('city', $city);

            $totalpatient->where('city', $city);
        }

        $gender = $request->input('gender');

        if (!empty($gender)) {
            $morethan4dayperweek->where('gender', $gender);
            $morethan4weeksastreach->where('gender', $gender);

            $totalpatient->where('gender', $gender);

        }



      
         $morethan4dayperweekdata = $morethan4dayperweek
                                    ->where('symptoms_last', 'More than 4 day per week')
                                    ->select(DB::raw('COUNT(id) as totalreg') , DB::raw('MONTHNAME(created_at) as month'))
                                    ->groupBy('month')
                                    ->orderBy('month')
                                    ->get();
         $morethan4weeksastreachdata = $morethan4weeksastreach
                                        ->where('symptoms_last', 'More than 4 week at a stretch')
                                        ->select(DB::raw('COUNT(id) as totalreg') , DB::raw('MONTHNAME(created_at) as month'))
                                        ->groupBy('month')
                                        ->orderBy('month')
                                        ->get();

                                        $totalpatient = $totalpatient
                                       // ->where('symptoms_last', 'More than 4 week at a stretch')
                                        ->select(DB::raw('COUNT(id) as totalreg') , DB::raw('MONTHNAME(created_at) as month'))
                                        ->groupBy('month')
                                        ->orderBy('month')
                                        ->get();
       // dd($totalpatient);

         $barchartdata = $totalpatient;

         return $barchartdata;
    }

    public static function filterforsymptopmsbarchart(Request $request){
        $asthma = DB::table('patient_reg');
        $common_cold = DB::table('patient_reg');
        $nasal_blockage = DB::table('patient_reg');
        $sneezing_single_multiple = DB::table('patient_reg');
        $cough = DB::table('patient_reg');

        $asthmaobj = [];
        $common_coldobj = [];
        $nasal_blockageobj = [];
        $sneezing_single_multipleobj = [];
        $coughobj = [];

        $age = $request->input('age');
        if (!empty($age)) {
            $age_arr = explode (",", $age);  
            // dd($age_arr);
            
            $asthma->whereRaw("age > $age_arr[0]");
            $asthma->whereRaw("age < $age_arr[1]");
            $common_cold->whereRaw("age > $age_arr[0]");
            $common_cold->whereRaw("age < $age_arr[1]");
            $nasal_blockage->whereRaw("age > $age_arr[0]");
            $nasal_blockage->whereRaw("age < $age_arr[1]");
            $sneezing_single_multiple->whereRaw("age > $age_arr[0]");
            $sneezing_single_multiple->whereRaw("age < $age_arr[1]");
            $cough->whereRaw("age > $age_arr[0]");
            $cough->whereRaw("age < $age_arr[1]");
        }

        $ordering_physician = $request->input('ordering_physician');
        if (!empty($ordering_physician)) {
            $asthma->where('ordering_physician', $ordering_physician);
            $common_cold->where('ordering_physician', $ordering_physician);
            $nasal_blockage->where('ordering_physician', $ordering_physician);
            $sneezing_single_multiple->where('ordering_physician', $ordering_physician);
            $cough->where('ordering_physician', $ordering_physician);
        }

        $state = $request->input('state');

        if (!empty($state)) {
            $asthma->where('state', $state);
            $common_cold->where('state', $state);
            $nasal_blockage->where('state', $state);
            $sneezing_single_multiple->where('state', $state);
            $cough->where('state', $state);
        }

        $city = $request->input('city');

        if (!empty($city)) {
            $asthma->where('city', $city);
            $common_cold->where('city', $city);
            $nasal_blockage->where('city', $city);
            $sneezing_single_multiple->where('city', $city);
            $cough->where('city', $city);
        }

        $gender = $request->input('gender');

        if (!empty($gender)) {
            $asthma->where('gender', $gender);
            $common_cold->where('gender', $gender);
            $nasal_blockage->where('gender', $gender);
            $sneezing_single_multiple->where('gender', $gender);
            $cough->where('gender', $gender);
        }

        
      
         $asthmadata = $asthma->where('asthma', "!=", "")
         ->select(DB::raw('COUNT(id) as totalreg') , DB::raw('MONTHNAME(created_at) as month'))
         ->groupBy('month')
         ->orderBy('month')
         ->get();;
         $asthmaobj['lable'] = "Asthma";
         $asthmaobj['color'] = "#7B1CBD";
         $asthmaobj['data'] = $asthmadata;
        

         $common_colddata = $asthma->where('common_cold', "!=", "")
                            ->select(DB::raw('COUNT(id) as totalreg') , DB::raw('MONTHNAME(created_at) as month'))
                            ->groupBy('month')
                            ->orderBy('month')
                            ->get();
         $common_coldobj['lable'] = "Common Cold";
         $common_coldobj['color'] = "#28BD1C";
         $common_coldobj['data'] = $common_colddata;

         $nasal_blockagedata = $asthma->where('nasal_blockage', "!=", "")
         ->select(DB::raw('COUNT(id) as totalreg') , DB::raw('MONTHNAME(created_at) as month'))
         ->groupBy('month')
         ->orderBy('month')
         ->get();
         $nasal_blockageobj['lable'] = "Nasal Blockage";
         $nasal_blockageobj['color'] = "#BD261C";
         $nasal_blockageobj['data'] = $nasal_blockagedata;

         $sneezing_single_multipledata = $asthma->where('sneezing_single_multiple', "!=", "")
         ->select(DB::raw('COUNT(id) as totalreg') , DB::raw('MONTHNAME(created_at) as month'))
         ->groupBy('month')
         ->orderBy('month')
         ->get();
         $sneezing_single_multipleobj['lable'] = "Sneezing Multiple Times";
         $sneezing_single_multipleobj['color'] = "#BD1C4A";
         $sneezing_single_multipleobj['data'] = $sneezing_single_multipledata;

         $coughdata = $asthma->where('cough', "!=", "")
         ->select(DB::raw('COUNT(id) as totalreg') , DB::raw('MONTHNAME(created_at) as month'))
         ->groupBy('month')
         ->orderBy('month')
         ->get();
         $coughobj['lable'] = "Cough";
         $coughobj['color'] = "#1CBDA2";
         $coughobj['data'] = $coughdata;



      
       // dd($totalpatient);

       //$barchartdata = [$asthmadata, $common_colddata, $nasal_blockagedata, $sneezing_single_multipledata, $coughdata];
       $barchartdata = [$asthmaobj , $common_coldobj ,  $nasal_blockageobj ,  $sneezing_single_multipleobj , $coughobj];
         //dd($barchartdata);
         return $barchartdata;
    }
   

    public static function symptopmsbarchart(){
        $asthma = DB::table('patient_reg');
        $common_cold = DB::table('patient_reg');
        $nasal_blockage = DB::table('patient_reg');
        $sneezing_single_multiple = DB::table('patient_reg');
        $cough = DB::table('patient_reg');

        $asthmaobj = [];
        $common_coldobj = [];
        $nasal_blockageobj = [];
        $sneezing_single_multipleobj = [];
        $coughobj = [];

       
        
      
         $asthmadata = $asthma->where('asthma', "!=", "")
         ->select(DB::raw('COUNT(id) as totalreg') , DB::raw('MONTHNAME(created_at) as month'))
         ->groupBy('month')
         ->orderBy('month')
         ->get();;
         $asthmaobj['lable'] = "Asthma";
         $asthmaobj['color'] = "#7B1CBD";
         $asthmaobj['data'] = $asthmadata;
        

         $common_colddata = $asthma->where('common_cold', "!=", "")
                            ->select(DB::raw('COUNT(id) as totalreg') , DB::raw('MONTHNAME(created_at) as month'))
                            ->groupBy('month')
                            ->orderBy('month')
                            ->get();
         $common_coldobj['lable'] = "Common Cold";
         $common_coldobj['color'] = "#28BD1C";
         $common_coldobj['data'] = $common_colddata;

         $nasal_blockagedata = $asthma->where('nasal_blockage', "!=", "")
         ->select(DB::raw('COUNT(id) as totalreg') , DB::raw('MONTHNAME(created_at) as month'))
         ->groupBy('month')
         ->orderBy('month')
         ->get();
         $nasal_blockageobj['lable'] = "Nasal Blockage";
         $nasal_blockageobj['color'] = "#BD261C";
         $nasal_blockageobj['data'] = $nasal_blockagedata;

         $sneezing_single_multipledata = $asthma->where('sneezing_single_multiple', "!=", "")
         ->select(DB::raw('COUNT(id) as totalreg') , DB::raw('MONTHNAME(created_at) as month'))
         ->groupBy('month')
         ->orderBy('month')
         ->get();
         $sneezing_single_multipleobj['lable'] = "Sneezing Multiple Times";
         $sneezing_single_multipleobj['color'] = "#BD1C4A";
         $sneezing_single_multipleobj['data'] = $sneezing_single_multipledata;

         $coughdata = $asthma->where('cough', "!=", "")
         ->select(DB::raw('COUNT(id) as totalreg') , DB::raw('MONTHNAME(created_at) as month'))
         ->groupBy('month')
         ->orderBy('month')
         ->get();
         $coughobj['lable'] = "Cough";
         $coughobj['color'] = "#1CBDA2";
         $coughobj['data'] = $coughdata;



      
       // dd($totalpatient);

       //$barchartdata = [$asthmadata, $common_colddata, $nasal_blockagedata, $sneezing_single_multipledata, $coughdata];
       $barchartdata = [$asthmaobj , $common_coldobj ,  $nasal_blockageobj ,  $sneezing_single_multipleobj , $coughobj];
         //dd($barchartdata);
         return  response()->json(['success' => true, 'response' => $barchartdata], 200);;
    }
}

