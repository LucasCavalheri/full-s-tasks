<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function index()
    {
        return TaskResource::collection(Task::with('user')->orderBy('id', 'desc')->get());
    }

    public function store(Request $request)
    {
        $storeTaskRequest = new StoreTaskRequest();
        $validator = Validator::make($request->all(), $storeTaskRequest->rules());

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $task = new Task($validator->validated());
        // $task->user_id = Auth::id();
        $task->user_id = 2;
        $task->save();

        return new TaskResource($task);
    }

    public function show(string $id)
    {
        $task = Task::find($id);

        // $this->authorize('view', $task);

        if ($task) {
            return new TaskResource($task);
        }

        return response()->json([
            'message' => 'Task not found',
        ], 404);
    }

    public function update(Request $request, string $id)
    {
        $task = Task::find($id);

        // $this->authorize('update', $task);

        $updateTaskRequest = new UpdateTaskRequest();

        $validator = Validator::make($request->all(), $updateTaskRequest->rules());

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors(),
            ], 422);
        }

        if (!$task) {
            return response()->json([
                'message' => 'Task not found',
            ], 404);
        }

        $task->update($validator->validated());

        return new TaskResource($task);
    }

    public function destroy(string $id)
    {
        // $this->authorize('delete', Task::find($id));

        Task::find($id)->delete();
    }
}
