<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

//        // Define roles and permissions
//        $roleAuthor = Role::create(['name' => 'author']);
//        $roleCollaborator = Role::create(['name' => 'collaborator']);
//
//        $createSectionsPermission = Permission::create(['name' => 'create sections']);
//        $editSectionsPermission = Permission::create(['name' => 'edit sections']);
////        // Add other permissions as needed
////
//        $roleAuthor->givePermissionTo($createSectionsPermission, $editSectionsPermission);
//        $roleCollaborator->givePermissionTo($editSectionsPermission);
    }
}
