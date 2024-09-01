
<div className="d-flex align-items-stretch">

<div className="page-holder bg-gray-100">
<div className="container-fluid px-lg-4 px-xl-5">
  {/* Page Header */}
  <div className="page-header">
    <h1 className="page-heading">Categories</h1>
  </div>
  <section>
    <div className="row mb-5">
      <div className="col-lg-4">
        <div className="card mb-4 mb-lg-0">
          <div className="card-body">
            <div className="mb-4">
              <label className="form-label" htmlFor="categoryName">
                Name
              </label>
              <input
                className="form-control"
                id="categoryName"
                type="text"
                value={"nombreCategoria"}
              />
              <div className="form-text">
                The name is how it appears on your site.
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label" htmlFor="categorySlug">
                Slug
              </label>
              <input
                className="form-control"
                id="categorySlug"
                type="text"
                value={"Estado"}
              />
              <div className="form-text">
                The “slug” is the URL-friendly version of the name. It is
                usually all lowercase and contains only letters, numbers,
                and hyphens.
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label" htmlFor="categoryParent">
                Parent
              </label>
              <select
                className="form-select"
                id="categoryParent"
                name="categoryParent"
              >
                <option value="0">None</option>
                <option value="0">Gear</option>
                <option value="1">Stories</option>
                <option value="2">Tips &amp; Tricks</option>
                <option value="3">Trips</option>
                <option value="4">Gear</option>
                <option value="5">Stories</option>
                <option value="6">Tips &amp; Tricks</option>
                <option value="7">Trips</option>
                <option value="8">Uncategorized</option>
              </select>
              <div className="form-text">
                Categories, unlike tags, can have a hierarchy. You might
                have a Jazz category, and under that have children
                categories htmlFor Bebop and Big Band. Totally optional.
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label" htmlFor="categoryDescription">
                Parent
              </label>
              <textarea
                className="form-control"
                id="categoryDescription"
                name="categoryDescription"
              ></textarea>
              <div className="form-text">
                The description is not prominent by default; however, some
                themes may show it.
              </div>
            </div>
            <button className="btn btn-primary mb-4">
              Add New Category
            </button>
          </div>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="card card-table">
          <div className="preload-wrapper">
            <table
              className="table table-hover mb-0"
              id="categoryDatatable"
            >
              <thead>
                <tr>
                  <th style={{ width: "20px" }}> </th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Slug</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                      />
                    </span>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      className="text-decoration-none text-reset fw-bolder"
                    >
                      Gear
                    </a>
                  </td>
                  <td>-</td>
                  <td>gear</td>
                  <td className="text-end">
                    <a
                      href="https://demo.bootstrapious.com/bubbly/1-3-2/cms-post.html"
                      className="text-decoration-none"
                    >
                      23
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                      />
                    </span>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      className="text-decoration-none text-reset fw-bolder"
                    >
                      Stories
                    </a>
                  </td>
                  <td>-</td>
                  <td>stories</td>
                  <td className="text-end">
                    <a
                      href="https://demo.bootstrapious.com/bubbly/1-3-2/cms-post.html"
                      className="text-decoration-none"
                    >
                      2
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                      />
                    </span>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      className="text-decoration-none text-reset fw-bolder"
                    >
                      Tips &amp; Tricks
                    </a>
                  </td>
                  <td>-</td>
                  <td>tips-&amp; tricks</td>
                  <td className="text-end">
                    <a
                      href="https://demo.bootstrapious.com/bubbly/1-3-2/cms-post.html"
                      className="text-decoration-none"
                    >
                      4
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                      />
                    </span>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      className="text-decoration-none text-reset fw-bolder"
                    >
                      Trips
                    </a>
                  </td>
                  <td>-</td>
                  <td>trips</td>
                  <td className="text-end">
                    <a
                      href="https://demo.bootstrapious.com/bubbly/1-3-2/cms-post.html"
                      className="text-decoration-none"
                    >
                      5
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                      />
                    </span>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      className="text-decoration-none text-reset fw-bolder"
                    >
                      Gear
                    </a>
                  </td>
                  <td>-</td>
                  <td>gear</td>
                  <td className="text-end">
                    <a
                      href="https://demo.bootstrapious.com/bubbly/1-3-2/cms-post.html"
                      className="text-decoration-none"
                    >
                      23
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                      />
                    </span>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      className="text-decoration-none text-reset fw-bolder"
                    >
                      Stories
                    </a>
                  </td>
                  <td>-</td>
                  <td>stories</td>
                  <td className="text-end">
                    <a
                      href="https://demo.bootstrapious.com/bubbly/1-3-2/cms-post.html"
                      className="text-decoration-none"
                    >
                      2
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                      />
                    </span>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      className="text-decoration-none text-reset fw-bolder"
                    >
                      Tips &amp; Tricks
                    </a>
                  </td>
                  <td>-</td>
                  <td>tips-&amp; tricks</td>
                  <td className="text-end">
                    <a
                      href="https://demo.bootstrapious.com/bubbly/1-3-2/cms-post.html"
                      className="text-decoration-none"
                    >
                      4
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                      />
                    </span>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      className="text-decoration-none text-reset fw-bolder"
                    >
                      Trips
                    </a>
                  </td>
                  <td>-</td>
                  <td>trips</td>
                  <td className="text-end">
                    <a
                      href="https://demo.bootstrapious.com/bubbly/1-3-2/cms-post.html"
                      className="text-decoration-none"
                    >
                      5
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                      />
                    </span>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      className="text-decoration-none text-reset fw-bolder"
                    >
                      Uncategorized
                    </a>
                  </td>
                  <td>-</td>
                  <td>uncategorized</td>
                  <td className="text-end">
                    <a
                      href="https://demo.bootstrapious.com/bubbly/1-3-2/cms-post.html"
                      className="text-decoration-none"
                    >
                      2
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <span className="me-2" id="categoryBulkAction">
              <select
                className="form-select form-select-sm d-inline w-auto mb-1 mb-lg-0"
                name="categoryBulkAction"
              >
                <option>Bulk Actions</option>
                <option>Delete</option>
              </select>
              <button className="btn btn-sm btn-outline-primary align-top mb-1 mb-lg-0">
                Apply
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

</div>

</div>
