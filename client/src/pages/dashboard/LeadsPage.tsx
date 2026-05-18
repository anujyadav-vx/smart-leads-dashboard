import {
  useEffect,
  useState,
  useCallback
} from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getLeads
} from "../../services/lead.service";

import type {
  Lead
} from "../../types/lead.types";

import useDebounce from "../../hooks/useDebounce";

const LeadsPage = () => {

  const [leads, setLeads] =
    useState<Lead[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [source, setSource] =
    useState("");

  const [sort, setSort] =
    useState("latest");

  const debouncedSearch =
    useDebounce(search);

  const fetchLeads =
    useCallback(async () => {

      try {

        setLoading(true);

        const query =
          new URLSearchParams();

        query.append(
          "page",
          String(page)
        );

        if (debouncedSearch) {
          query.append(
            "search",
            debouncedSearch
          );
        }

        if (status) {
          query.append(
            "status",
            status
          );
        }

        if (source) {
          query.append(
            "source",
            source
          );
        }

        if (sort) {
          query.append(
            "sort",
            sort
          );
        }

        const response =
          await getLeads(
            query.toString()
          );

        setLeads(
          response.data.leads
        );

        setTotalPages(
          response.data.pagination.totalPages
        );

      } catch (error: unknown) {

        if (
          error instanceof Error
        ) {

          console.log(
            error.message
          );

        } else {

          console.log(
            "Something went wrong"
          );
        }

      } finally {

        setLoading(false);
      }

    }, [
      page,
      debouncedSearch,
      status,
      source,
      sort
    ]);

  useEffect(() => {

    const timer =
      setTimeout(() => {

        void fetchLeads();

      }, 0);

    return () =>
      clearTimeout(timer);

  }, [fetchLeads]);

  return (

    <DashboardLayout>

      <div className="p-8">

        {/* FILTERS */}

        <div
          className="
          flex
          flex-col
          md:flex-row
          gap-4
          mb-6
        "
        >

          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
            border
            rounded-lg
            px-4
            py-2
            w-full
          "
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
            className="
            border
            rounded-lg
            px-4
            py-2
          "
          >

            <option value="">
              All Status
            </option>

            <option value="New">
              New
            </option>

            <option value="Contacted">
              Contacted
            </option>

            <option value="Qualified">
              Qualified
            </option>

            <option value="Lost">
              Lost
            </option>

          </select>

          <select
            value={source}
            onChange={(e) =>
              setSource(
                e.target.value
              )
            }
            className="
            border
            rounded-lg
            px-4
            py-2
          "
          >

            <option value="">
              All Sources
            </option>

            <option value="Website">
              Website
            </option>

            <option value="Instagram">
              Instagram
            </option>

            <option value="Referral">
              Referral
            </option>

          </select>

          <select
            value={sort}
            onChange={(e) =>
              setSort(
                e.target.value
              )
            }
            className="
            border
            rounded-lg
            px-4
            py-2
          "
          >

            <option value="latest">
              Latest
            </option>

            <option value="oldest">
              Oldest
            </option>

          </select>

        </div>

        {/* TABLE */}

        <div
          className="
          bg-white
          rounded-lg
          shadow
          overflow-x-auto
        "
        >

          <table
            className="
            w-full
            text-left
          "
          >

            <thead
              className="
              border-b
            "
            >

              <tr>

                <th className="p-4">
                  Name
                </th>

                <th className="p-4">
                  Email
                </th>

                <th className="p-4">
                  Status
                </th>

                <th className="p-4">
                  Source
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={4}
                    className="
                    p-4
                    text-center
                  "
                  >
                    Loading...
                  </td>

                </tr>

              ) : leads.length === 0 ? (

                <tr>

                  <td
                    colSpan={4}
                    className="
                    p-4
                    text-center
                  "
                  >
                    No leads found
                  </td>

                </tr>

              ) : (

                leads.map(
                  (
                    lead: Lead
                  ) => (

                    <tr
                      key={lead._id}
                      className="
                      border-b
                    "
                    >

                      <td className="p-4">
                        {lead.name}
                      </td>

                      <td className="p-4">
                        {lead.email}
                      </td>

                      <td className="p-4">
                        {lead.status}
                      </td>

                      <td className="p-4">
                        {lead.source}
                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

        {/* PAGINATION */}

        <div
          className="
          flex
          justify-center
          gap-4
          mt-6
        "
        >

          <button
            disabled={page === 1}
            onClick={() =>
              setPage(
                (prev) => prev - 1
              )
            }
            className="
            px-4
            py-2
            border
            rounded
          "
          >
            Previous
          </button>

          <span>

            Page {page}
            {" "}
            of
            {" "}
            {totalPages}

          </span>

          <button
            disabled={
              page === totalPages
            }
            onClick={() =>
              setPage(
                (prev) => prev + 1
              )
            }
            className="
            px-4
            py-2
            border
            rounded
          "
          >
            Next
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default LeadsPage;