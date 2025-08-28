import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP, TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP } from "@/constants.jsx";
import { Link, router } from '@inertiajs/react';
import TableHeading from "@/Components/TableHeading";

export default function TasksTable({tasks, queryParams = null, hideProjectColumn = false}){

    queryParams = queryParams || {}
    const searchFieldChanged = (name ,value) => {
      if(value){
        queryParams[name] = value;
      }else{
        delete queryParams[name];
      }

      router.get(route('task.index'), queryParams);
    }

    const onKeyPress = (name, e) =>{
      if(e.key !== 'Enter') return;

      searchFieldChanged(name, e.target.value);
    }

    const sortChanged = (name) =>{
      if(name === queryParams.sort_field){
        if(queryParams.sort_direction === 'asc'){
          queryParams.sort_direction = 'desc';
        }else{
          queryParams.sort_direction = 'asc';
        }
      }else{
        queryParams.sort_field = name;
        queryParams.sort_direction = 'asc';
      }

      router.get(route('task.index'), queryParams);

    }

    const deleteTask = (task) =>{
      if (!window.confirm("Are you sure you want to delete the project?")) {
        return;
      }
      router.delete(route('task.destroy',task.id));
    }

  return ( <>
            <div className="p-6 text-gray-900 dark:text-gray-100 overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                        <TableHeading name="id" sort_direction={queryParams.sort_direction} sort_field={queryParams.sort_field} sortChanged={sortChanged}>
                          ID
                        </TableHeading>
                        <th className="px-3 py-3">Image</th>
                        <TableHeading name="name" sort_direction={queryParams.sort_direction} sort_field={queryParams.sort_field} sortChanged={sortChanged}>
                          Name
                        </TableHeading>
                        <TableHeading name="status" sort_direction={queryParams.sort_direction} sort_field={queryParams.sort_field} sortChanged={sortChanged}>
                          Status
                        </TableHeading>
                        <TableHeading name="priority" sort_direction={queryParams.sort_direction} sort_field={queryParams.sort_field} sortChanged={sortChanged}>
                          Priority
                        </TableHeading>
                        <TableHeading name="created_at" sort_direction={queryParams.sort_direction} sort_field={queryParams.sort_field} sortChanged={sortChanged}>
                          Create Date
                        </TableHeading>
                        <TableHeading name="due_date" sort_direction={queryParams.sort_direction} sort_field={queryParams.sort_field} sortChanged={sortChanged}>
                          Due Date
                        </TableHeading>
                        <th className="px-3 py-3">Created By</th>
                        <th className="px-3 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3">
                          <TextInput className="w-full" placeholder="task Name" onBlur={(e) => searchFieldChanged('name', e.target.value) }
                            onKeyPress={(e) => onKeyPress('name', e)}  defaultValue={queryParams.name}
                          />
                        </th>
                        <th className="px-3 py-3">
                          <SelectInput className="w-full" defaultValue={queryParams.status}
                            onChange={(e) => searchFieldChanged('status', e.target.value)}
                          >
                          <option value="">Select Status</option>
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>

                          </SelectInput>
                        </th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.data.map((task,index) => (
                        <tr key={task.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-3 py-2">{task.id}</td>
                            <td className="px-3 py-2"><img src={task.image_path} width="60"/></td>
                            <td className="px-3 py-2">{task.name}</td>
                            <td className="px-3 py-2">
                              <span className={"px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status] }>
                                {TASK_STATUS_TEXT_MAP[task.status]}
                              </span>
                            </td>
                            <td className="px-3 py-2">
                              <span className={"px-2 py-1 rounded text-white " + TASK_PRIORITY_CLASS_MAP[task.priority] }>
                                {TASK_PRIORITY_TEXT_MAP[task.priority]}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
                            <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                            <td className="px-3 py-2">{task.createdBy.name}</td>
                            <td className="px-3 py-2 text-nowrap">
                                <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1" href={route('task.edit',task.id)}>Edit</Link>
                                <Link className="font-medium text-orange-600 dark:text-orage-500 hover:underline mx-1" href={route('task.show',task.id)}>View</Link>
                                <button onClick={(e) => deleteTask(task)} className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1" >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination links={tasks.meta.links} />
        </div>
    </>
  )
}
