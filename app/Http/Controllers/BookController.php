<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Section;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $books = $user->books;
        return response()->json($books);
    }

    public function show(Book $book)
    {
        return $book;
    }

    public function store(Request $request)
    {
        $book = new Book();
        $book->title = $request->input('title');
        $book->author_id = auth()->user()->id;
        $collaboratorId = $request->input('collaborator');
        $book->save();
        $book->collaborators()->attach($collaboratorId);

        $sectionsData = $request->input('sections', []);
        foreach ($sectionsData as $sectionData) {
            $section = new Section();
            $section->title = $sectionData['title'];
            $section->book_id = $book->id;
            $section->save();

            // Handle subsections for each section
            $subsectionsData = $sectionData['subsections'] ?? [];
            foreach ($subsectionsData as $subsectionData) {
                $subsection = new Subsection();
                $subsection->title = $subsectionData['title'];
                $subsection->content = $subsectionData['content'];
                $subsection->section_id = $section->id;
                $subsection->save();
            }
        }

        return response()->json($book, 201);
    }

    public function update(Request $request, Book $book)
    {
        $book->title = $request->input('title');
        $book->author_id = auth()->user()->id;
        $collaboratorId = $request->input('collaborator');
        $book->save();
        $book->collaborators()->attach($collaboratorId);

        return response()->json($book, 201);
    }

    public function addCollaborator(Request $request, $bookId)
    {
        $book = Book::findOrFail($bookId);
        $author = $request->user();

        if ($author->id === $book->author_id) {
            $collaboratorId = $request->input('collaborator');
            $book->collaborators()->attach($collaboratorId);
            return response()->json(['message' => 'Collaborator added successfully'], 200);
        } else {
            return response()->json(['error' => 'You are not the author of this book'], 403);
        }
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return response("", 204);
    }
}
