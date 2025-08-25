import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { Head, Link, router } from '@inertiajs/react';

export default function Create(){
  return(
    <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
              Create New Project
            </h2>

          </div>
    }
    >
    <Head title="Create New Project" />

      <div className="py-12">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="p-6 text-gray-900 dark:text-gray-100 overflow-x-auto">
                </div>
              </div>
            </div>
        </div>

    </AuthenticatedLayout>
  )
}
