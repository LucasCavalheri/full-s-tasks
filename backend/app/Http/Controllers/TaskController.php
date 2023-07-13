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
    public function __construct()
    {
        $this->authorizeResource(Task::class);
    }

    public function index()
    {
        return TaskResource::collection(Task::with('user')->get());
    }

    public function store(Request $request)
    {
        $storeTaskRequest = new StoreTaskRequest($request->validated());

        $validator = Validator::make($request->all(), $storeTaskRequest->rules());

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $task = new Task($request->validated());
        $task->user_id = Auth::id();
        $task->save();

        return new TaskResource($task);
    }

    public function show(string $id)
    {
        $task = Task::find($id);

        $this->authorize('view', $task);

        if ($task) {
            return new TaskResource($task);
        }

        return response()->json([
            'message' => 'Task not found',
        ], 404);
    }

    public function update(Request $request, string $id)
    {
        $updateTaskRequest = new UpdateTaskRequest($request->validated());

        $validator = Validator::make($request->all(), $updateTaskRequest->rules());

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $task = Task::find($id);

        // if (!Auth::id() !== $task->user_id) {
        //     return response()->json([
        //         'message' => 'You are not authorized to update this task',
        //     ], 403);
        // }

        if ($task) {
            $task->update($request->validated());

            return new TaskResource($task);
        }


        return response()->json([
            'message' => 'Task not found',
        ], 404);
    }

    public function destroy(string $id)
    {
        $task = Task::find($id);

        // if (!Auth::id() !== $task->user_id) {
        //     return response()->json([
        //         'message' => 'You are not authorized to update this task',
        //     ], 403);
        // }

        if ($task) {
            $task->delete();
        }

        return response()->json([
            'message' => 'Task not found',
        ], 404);
    }
}
