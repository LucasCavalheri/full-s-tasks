<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;

class TaskController extends Controller
{
    public function index()
    {
        return TaskResource::collection(Task::all());
    }
    public function store(StoreTaskRequest $request)
    {
        $task = Task::create($request->validated());

        return new TaskResource($task);
    }

    public function show(string $id)
    {
        if ($task = Task::find($id)) {
            return new TaskResource($task);
        }

        return response()->json([
            'message' => 'Task not found',
        ], 404);
    }

    public function update(UpdateTaskRequest $request, string $id)
    {
        if ($task = Task::find($id)) {
            $task->update($request->validated());

            return new TaskResource($task);
        }

        return response()->json([
            'message' => 'Task not found',
        ], 404);
    }

    public function destroy(string $id)
    {
        if ($task = Task::find($id)) {
            $task->delete();
        }

        return response()->json([
            'message' => 'Task not found',
        ], 404);
    }
}
