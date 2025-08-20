<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=> $this->id,
            'name'=> $this->name,
            'description'=> $this->description,
            'due_date'=> (new Carbon($this->due_date))->format('Y-m-d'),
            'status'=> $this->status,
            'priority'=> $this->priority,
            'image_path'=> $this->image_path,
            'created_at'=> (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at'=> (new Carbon($this->updated_at))->format('Y-m-d'),
            'created_by'=> new UserResource($this->created_by),
            'updated_by'=> new UserResource($this->update_by),
            'assigned_user_id'=> new UserResource($this->assigned_user_id),
        ];
    }
}
