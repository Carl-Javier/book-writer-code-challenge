<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Book;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        $permissions = [
            'create-sections',
            'edit-sections',
            'grant-access',
            'all-access',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission, 'guard_name' => 'web']);
        }


        $user1 = \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $user2 = \App\Models\User::factory()->create([
            'name' => 'Test2 User',
            'email' => 'test2@example.com',
            'password' => bcrypt('password'),
        ]);

        $user3 = \App\Models\User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);

        $roleAuthor = \Spatie\Permission\Models\Role::create(['name' => 'Author']);
        $roleCollab = \Spatie\Permission\Models\Role::create(['name' => 'Collaborator']);
        $roleAdmin = \Spatie\Permission\Models\Role::create(['name' => 'Admin']);

        $permissions = Permission::pluck('id','id')->all();

        $roleAuthor->syncPermissions([
            'create-sections',
            'edit-sections',
            'grant-access',
        ]);
        $roleCollab->syncPermissions(['edit-sections']);
        $roleAdmin->syncPermissions($permissions);

        $user1->assignRole([$roleAuthor->id]);
        $user2->assignRole([$roleCollab->id]);
        $user3->assignRole([$roleAdmin->id]);

        $book = Book::create([
           'title' => 'Book1',
           'author_id' => $user1->id
        ]);

        $book->collaborators()->attach($user2->id);

    }
}
