<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class ProjectResource extends JsonResource
{
    public static $wrap = false;
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
            'image_path'=> $this->image_path ? Storage::url($this->image_path) : '',
            'created_at'=> (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at'=> (new Carbon($this->updated_at))->format('Y-m-d'),
            'created_by'=> new UserResource($this->createdBy),
            'updated_by'=> new UserResource($this->updatedBy),
        ];
    }
}
