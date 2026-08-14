"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";

type Solution = {
  _id: string;
  title: string;
  slug: string;
  problemUrl: string;
  category: string;
  code: string;
  videoUrl?: string;
  timeComplexity: string;
  spaceComplexity: string;
};

type Category = {
  _id: string;
  name: string;
  slug: string;
};

type EditForm = {
  title: string;
  problemUrl: string;
  category: string;
  code: string;
  videoUrl: string;
  timeComplexity: string;
  spaceComplexity: string;
};

export default function EditSolutionsPage() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingSolution, setEditingSolution] =
    useState<Solution | null>(null);

  const [editForm, setEditForm] = useState<EditForm>({
    title: "",
    problemUrl: "",
    category: "",
    code: "",
    videoUrl: "",
    timeComplexity: "",
    spaceComplexity: "",
  });

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // --------------------------------------------------
  // Fetch solutions + categories
  // --------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [solutionsResponse, categoriesResponse] =
          await Promise.all([
            fetch("/api/solutions"),
            fetch("/api/categories"),
          ]);

        if (!solutionsResponse.ok) {
          throw new Error("Failed to fetch solutions");
        }

        if (!categoriesResponse.ok) {
          throw new Error("Failed to fetch categories");
        }

        const solutionsData = await solutionsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setSolutions(solutionsData.solutions || []);
        setCategories(categoriesData.categories || []);
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --------------------------------------------------
  // Open edit dialog
  // --------------------------------------------------

  const openEdit = (solution: Solution) => {
    setEditingSolution(solution);

    setEditForm({
      title: solution.title,
      problemUrl: solution.problemUrl,
      category: solution.category,
      code: solution.code,
      videoUrl: solution.videoUrl || "",
      timeComplexity: solution.timeComplexity,
      spaceComplexity: solution.spaceComplexity,
    });

    setError("");
  };

  // --------------------------------------------------
  // Close edit dialog
  // --------------------------------------------------

  const closeEdit = () => {
    if (saving) return;

    setEditingSolution(null);

    setEditForm({
      title: "",
      problemUrl: "",
      category: "",
      code: "",
      videoUrl: "",
      timeComplexity: "",
      spaceComplexity: "",
    });
  };

  // --------------------------------------------------
  // Handle form changes
  // --------------------------------------------------

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --------------------------------------------------
  // Edit solution
  // --------------------------------------------------

  const handleSave = async () => {
    if (!editingSolution) return;

    try {
      setSaving(true);
      setError("");

      const response = await fetch(
        `/api/admin/${editingSolution._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update solution"
        );
      }

      /*
       * Update the solution in the local list.
       *
       * If the backend returns the updated solution,
       * use that. Otherwise use the existing solution
       * + edited fields.
       */
      const updatedSolution: Solution =
        data.solution || {
          ...editingSolution,
          ...editForm,
        };

      setSolutions((prev) =>
        prev.map((solution) =>
          solution._id === editingSolution._id
            ? updatedSolution
            : solution
        )
      );

      closeEdit();

      /*
       * Full reload so sidebar and all data
       * are guaranteed to be up to date.
       */
      window.location.reload();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update solution"
      );

      setSaving(false);
    }
  };

  // --------------------------------------------------
  // Delete solution
  // --------------------------------------------------

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");

      const response = await fetch(`/api/admin/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete solution"
        );
      }

      /*
       * Remove it immediately from the list.
       */
      setSolutions((prev) =>
        prev.filter((solution) => solution._id !== id)
      );
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete solution"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // --------------------------------------------------
  // Loading state
  // --------------------------------------------------

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] px-4 py-10 text-[#b5b5b5] sm:px-6">
        <div className="mx-auto max-w-4xl">

          <div className="mb-8">
            <div className="h-3 w-16 animate-pulse rounded bg-[#202020]" />

            <div className="mt-3 h-8 w-52 animate-pulse rounded bg-[#181818]" />

            <div className="mt-3 h-4 w-72 animate-pulse rounded bg-[#151515]" />
          </div>

          <div className="overflow-hidden rounded-lg border border-[#242424]">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[73px] animate-pulse border-b border-[#1c1c1c] bg-[#111111]"
              />
            ))}
          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-10 text-[#b5b5b5] sm:px-6">

      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">

          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#666]">
            Admin
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#f0f0f0]">
            Edit Solutions
          </h1>

          <p className="mt-2 text-sm text-[#666]">
            Manage your published competitive programming solutions.
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-md border border-[#3a2525] bg-[#151010] px-4 py-3 text-sm text-[#c9a0a0]">
            {error}
          </div>
        )}

        {/* Empty */}
        {solutions.length === 0 ? (
          <div className="rounded-lg border border-[#242424] bg-[#111111] p-10 text-center">
            <p className="text-sm text-[#666]">
              No solutions found.
            </p>
          </div>
        ) : (

          /* Solution List */
          <div className="overflow-hidden rounded-lg border border-[#242424] bg-[#111111]">

            {solutions.map((solution, index) => (
              <div
                key={solution._id}
                className={`flex items-center justify-between gap-4 px-4 py-4 sm:px-5 ${
                  index !== solutions.length - 1
                    ? "border-b border-[#1c1c1c]"
                    : ""
                }`}
              >

                {/* Title */}
                <div className="min-w-0">

                  <h2 className="truncate text-sm font-medium text-[#ddd]">
                    {solution.title}
                  </h2>

                  <p className="mt-1 truncate font-mono text-xs text-[#555]">
                    {solution.slug}
                  </p>

                </div>

                {/* Buttons */}
                <div className="flex shrink-0 items-center gap-2">

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() => openEdit(solution)}
                    className="flex items-center gap-2 rounded-md border border-[#292929] px-3 py-2 text-xs text-[#999] transition hover:bg-[#1a1a1a] hover:text-[#eee]"
                  >
                    <Pencil size={14} />

                    <span className="hidden sm:inline">
                      Edit
                    </span>
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    disabled={deletingId === solution._id}
                    onClick={() =>
                      handleDelete(
                        solution._id,
                        solution.title
                      )
                    }
                    className="flex items-center gap-2 rounded-md border border-[#292929] px-3 py-2 text-xs text-[#999] transition hover:border-[#3a2525] hover:bg-[#181010] hover:text-[#d6aaaa] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 size={14} />

                    <span className="hidden sm:inline">
                      {deletingId === solution._id
                        ? "Deleting..."
                        : "Delete"}
                    </span>
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* ================================================= */}
      {/* EDIT DIALOG */}
      {/* ================================================= */}

      {editingSolution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

          <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-[#292929] bg-[#0e0e0e] shadow-2xl">

            {/* Dialog header */}
            <div className="flex shrink-0 items-center justify-between border-b border-[#242424] px-5 py-4">

              <div className="min-w-0">

                <p className="text-xs uppercase tracking-wider text-[#555]">
                  Edit Solution
                </p>

                <h2 className="mt-1 truncate text-lg font-medium text-[#eee]">
                  {editingSolution.title}
                </h2>

              </div>

              <button
                type="button"
                onClick={closeEdit}
                disabled={saving}
                className="rounded-md p-2 text-[#666] transition hover:bg-[#1a1a1a] hover:text-[#ddd] disabled:opacity-50"
              >
                <X size={18} />
              </button>

            </div>

            {/* Dialog body */}
            <div className="overflow-y-auto">

              <div className="space-y-5 p-5">

                {/* Title */}
                <div>
                  <label
                    htmlFor="edit-title"
                    className="mb-2 block text-sm text-[#aaa]"
                  >
                    Problem Title
                  </label>

                  <input
                    id="edit-title"
                    name="title"
                    value={editForm.title}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-[#242424] bg-[#111111] px-4 py-3 text-sm text-[#ddd] outline-none transition placeholder:text-[#555] focus:border-[#3a3a3a]"
                  />
                </div>

                {/* Problem URL */}
                <div>
                  <label
                    htmlFor="edit-problem-url"
                    className="mb-2 block text-sm text-[#aaa]"
                  >
                    Problem URL
                  </label>

                  <input
                    id="edit-problem-url"
                    name="problemUrl"
                    type="url"
                    value={editForm.problemUrl}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-[#242424] bg-[#111111] px-4 py-3 text-sm text-[#ddd] outline-none transition placeholder:text-[#555] focus:border-[#3a3a3a]"
                  />
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="edit-category"
                    className="mb-2 block text-sm text-[#aaa]"
                  >
                    Category
                  </label>

                  <select
                    id="edit-category"
                    name="category"
                    value={editForm.category}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-[#242424] bg-[#111111] px-4 py-3 text-sm text-[#ddd] outline-none focus:border-[#3a3a3a]"
                  >
                    <option value="" disabled>
                      Select category
                    </option>

                    {categories.map((category) => (
                      <option
                        key={category.slug}
                        value={category.slug}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Complexity */}
                <div className="grid gap-4 sm:grid-cols-2">

                  {/* Time */}
                  <div>
                    <label
                      htmlFor="edit-time"
                      className="mb-2 block text-sm text-[#aaa]"
                    >
                      Time Complexity
                    </label>

                    <input
                      id="edit-time"
                      name="timeComplexity"
                      value={editForm.timeComplexity}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-[#242424] bg-[#111111] px-4 py-3 font-mono text-sm text-[#ddd] outline-none focus:border-[#3a3a3a]"
                    />
                  </div>

                  {/* Space */}
                  <div>
                    <label
                      htmlFor="edit-space"
                      className="mb-2 block text-sm text-[#aaa]"
                    >
                      Space Complexity
                    </label>

                    <input
                      id="edit-space"
                      name="spaceComplexity"
                      value={editForm.spaceComplexity}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-[#242424] bg-[#111111] px-4 py-3 font-mono text-sm text-[#ddd] outline-none focus:border-[#3a3a3a]"
                    />
                  </div>

                </div>

                {/* Code */}
                <div>
                  <label
                    htmlFor="edit-code"
                    className="mb-2 block text-sm text-[#aaa]"
                  >
                    Solution Code
                  </label>

                  <textarea
                    id="edit-code"
                    name="code"
                    value={editForm.code}
                    onChange={handleChange}
                    required
                    rows={18}
                    spellCheck={false}
                    className="w-full resize-y rounded-md border border-[#242424] bg-[#111111] px-4 py-3 font-mono text-sm leading-6 text-[#ddd] outline-none transition focus:border-[#3a3a3a]"
                  />
                </div>

                {/* Video */}
                <div>
                  <label
                    htmlFor="edit-video"
                    className="mb-2 block text-sm text-[#aaa]"
                  >
                    Video URL{" "}
                    <span className="text-[#555]">
                      (optional)
                    </span>
                  </label>

                  <input
                    id="edit-video"
                    name="videoUrl"
                    type="url"
                    value={editForm.videoUrl}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#242424] bg-[#111111] px-4 py-3 text-sm text-[#ddd] outline-none transition placeholder:text-[#555] focus:border-[#3a3a3a]"
                  />
                </div>

              </div>

            </div>

            {/* Dialog footer */}
            <div className="flex shrink-0 justify-end gap-3 border-t border-[#242424] px-5 py-4">

              <button
                type="button"
                onClick={closeEdit}
                disabled={saving}
                className="rounded-md border border-[#292929] px-4 py-2.5 text-sm text-[#888] transition hover:bg-[#181818] hover:text-[#ddd] disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="rounded-md bg-[#e5e5e5] px-4 py-2.5 text-sm font-medium text-[#0b0b0b] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}