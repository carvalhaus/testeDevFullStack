<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $currentTimestamp = Carbon::now();

        DB::table('users')->insert([
            [
                'email' => 'admintrador@senacrs.com.br',
                'name' => 'Administrador',
                'password' => Hash::make('adminpassword'),
                'level' => 1,
                'created_at' => $currentTimestamp,
                'updated_at' => $currentTimestamp,
            ],
            [
                'email' => 'vidal.carine@senacrs.com.br',
                'name' => 'Carine Vidal',
                'password' => Hash::make('carinepassword'),
                'level' => 2,
                'created_at' => $currentTimestamp,
                'updated_at' => $currentTimestamp,
            ],
            [
                'email' => 'rossi.gian@senacrs.com.br',
                'name' => 'Gian Rossi',
                'password' => Hash::make('gianpassword'),
                'level' => 3,
                'created_at' => $currentTimestamp,
                'updated_at' => $currentTimestamp,
            ]
        ]);
    }
}
