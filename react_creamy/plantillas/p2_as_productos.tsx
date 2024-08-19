<div className="page-holder bg-gray-100">
<div className="container-fluid px-lg-4 px-xl-5">
      {/* Breadcrumbs */}
      <div className="page-breadcrumb">
        <ul className="breadcrumb">
          <li className="breadcrumb-item"><a href="https://demo.bootstrapious.com/bubbly/1-3-2/index.html">Home</a></li>
          <li className="breadcrumb-item active">Products     </li>
        </ul>
      </div>
  {/* Page Header */}
  <div className="page-header d-flex justify-content-between align-items-center">
    <div>
      <h1 className="page-heading">Products</h1>
      <ul className="list-inline text-sm">
        <li className="list-inline-item"><a className="text-gray-600" href="#!"><i className="fas fa-upload me-2"> </i>Import</a></li>
        <li className="list-inline-item"><a className="text-gray-600" href="#!"><i className="fas fa-download me-2"> </i>Export</a></li>
      </ul>
    </div>
    <div><a className="btn btn-primary text-uppercase" href="https://demo.bootstrapious.com/bubbly/1-3-2/e-commerce-product-new.html"> <i className="fa fa-plus me-2"> </i>Add new</a></div>
  </div>
  <section className="mb-5">
    <ul className="nav nav-tabs mb-5" role="tablist">
      <li className="nav-item"><a className="nav-link active" href="#">All products</a></li>
      <li className="nav-item"><a className="nav-link text-reset" href="#!">Archived</a></li>
    </ul>
    <div className="card card-table">
      <div className="preload-wrapper">
        <table className="table table-hover table-borderless align-middle mb-0" id="productsDatatable">
          <thead>
            <tr>
              <th>Product Id</th>
              <th style={{width:'300px'}}>Name</th>
              <th>Price</th>
              <th>In Stock</th>
              <th>Last Ordered</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="align-middle">
              <td>#2568</td>
              <td className="d-flex align-items-center"><img className="card-table-img img-fluid rounded me-3" src="https://demo.bootstrapious.com/bubbly/1-3-2/img/product/product-1.jpg" alt="" width="70"/><a className="text-reset text-decoration-none" href="#!"><strong>Round grey hanging decor</strong></a></td>
              <td>$22.00</td>
              <td>43</td>
              <td className="text-muted">2021/08/17</td>
              <td>
                <label className="badge badge-primary-light">New Arrival</label>
              </td>
              <td><a className="me-3 text-lg text-success" href="#!"><i className="far fa-edit"></i></a><a className="text-lg text-danger" href="#!"><i className="far fa-trash-alt"></i></a></td>
            </tr>
            <tr className="align-middle">
              <td>#2569</td>
              <td className="d-flex align-items-center"><img className="card-table-img img-fluid rounded me-3" src="https://demo.bootstrapious.com/bubbly/1-3-2/img/product/product-2.jpg" alt="" width="70"/><a className="text-reset text-decoration-none" href="#!"><strong>silver black round Ipod</strong></a></td>
              <td>$22.00</td>
              <td>44</td>
              <td className="text-muted">2021/04/22</td>
              <td>
              </td>
              <td><a className="me-3 text-lg text-success" href="#!"><i className="far fa-edit"></i></a><a className="text-lg text-danger" href="#!"><i className="far fa-trash-alt"></i></a></td>
            </tr>
            <tr className="align-middle">
              <td>#2570</td>
              <td className="d-flex align-items-center"><img className="card-table-img img-fluid rounded me-3" src="https://demo.bootstrapious.com/bubbly/1-3-2/img/product/product-3.jpg" alt="" width="70"/><a className="text-reset text-decoration-none" href="#!"><strong>White USB cable</strong></a></td>
              <td>$22.00</td>
              <td>45</td>
              <td className="text-muted">2021/04/14</td>
              <td>
                <label className="badge badge-info-light">Trending</label>
              </td>
              <td><a className="me-3 text-lg text-success" href="#!"><i className="far fa-edit"></i></a><a className="text-lg text-danger" href="#!"><i className="far fa-trash-alt"></i></a></td>
            </tr>
            <tr className="align-middle">
              <td>#2571</td>
              <td className="d-flex align-items-center"><img className="card-table-img img-fluid rounded me-3" src="https://demo.bootstrapious.com/bubbly/1-3-2/img/product/product-4.jpg" alt="" width="70"/><a className="text-reset text-decoration-none" href="#!"><strong>Sony PS 4 game controller</strong></a></td>
              <td>$22.00</td>
              <td>46</td>
              <td className="text-muted">2021/09/30</td>
              <td>
              </td>
              <td><a className="me-3 text-lg text-success" href="#!"><i className="far fa-edit"></i></a><a className="text-lg text-danger" href="#!"><i className="far fa-trash-alt"></i></a></td>
            </tr>
            <tr className="align-middle">
              <td>#2572</td>
              <td className="d-flex align-items-center"><img className="card-table-img img-fluid rounded me-3" src="https://demo.bootstrapious.com/bubbly/1-3-2/img/product/product-5.jpg" alt="" width="70"/><a className="text-reset text-decoration-none" href="#!"><strong>Kui Ye Chen’s AirPods</strong></a></td>
              <td>$22.00</td>
              <td>47</td>
              <td className="text-muted">2021/12/30</td>
              <td>
              </td>
              <td><a className="me-3 text-lg text-success" href="#!"><i className="far fa-edit"></i></a><a className="text-lg text-danger" href="#!"><i className="far fa-trash-alt"></i></a></td>
            </tr>
            <tr className="align-middle">
              <td>#2573</td>
              <td className="d-flex align-items-center"><img className="card-table-img img-fluid rounded me-3" src="https://demo.bootstrapious.com/bubbly/1-3-2/img/product/product-6.jpg" alt="" width="70"/><a className="text-reset text-decoration-none" href="#!"><strong>Black camera lens</strong></a></td>
              <td>$22.00</td>
              <td>48</td>
              <td className="text-muted">2021/03/21</td>
              <td>
                <label className="badge badge-success-light">Hot</label>
              </td>
              <td><a className="me-3 text-lg text-success" href="#!"><i className="far fa-edit"></i></a><a className="text-lg text-danger" href="#!"><i className="far fa-trash-alt"></i></a></td>
            </tr>
            <tr className="align-middle">
              <td>#2574</td>
              <td className="d-flex align-items-center"><img className="card-table-img img-fluid rounded me-3" src="https://demo.bootstrapious.com/bubbly/1-3-2/img/product/product-7.jpg" alt="" width="70"/><a className="text-reset text-decoration-none" href="#!"><strong>Apple wireless keyboard</strong></a></td>
              <td>$22.00</td>
              <td>49</td>
              <td className="text-muted">2021/03/09</td>
              <td>
              </td>
              <td><a className="me-3 text-lg text-success" href="#!"><i className="far fa-edit"></i></a><a className="text-lg text-danger" href="#!"><i className="far fa-trash-alt"></i></a></td>
            </tr>
            <tr className="align-middle">
              <td>#2575</td>
              <td className="d-flex align-items-center"><img className="card-table-img img-fluid rounded me-3" src="https://demo.bootstrapious.com/bubbly/1-3-2/img/product/product-8.jpg" alt="" width="70"/><a className="text-reset text-decoration-none" href="#!"><strong>Black Canon EOS camera</strong></a></td>
              <td>$22.00</td>
              <td>50</td>
              <td className="text-muted">2021/10/15</td>
              <td>
                <label className="badge badge-danger-light">Soldout</label>
              </td>
              <td><a className="me-3 text-lg text-success" href="#!"><i className="far fa-edit"></i></a><a className="text-lg text-danger" href="#!"><i className="far fa-trash-alt"></i></a></td>
            </tr>
            <tr className="align-middle">
              <td>#2576</td>
              <td className="d-flex align-items-center"><img className="card-table-img img-fluid rounded me-3" src="https://demo.bootstrapious.com/bubbly/1-3-2/img/product/product-9.jpg" alt="" width="70"/><a className="text-reset text-decoration-none" href="#!"><strong>Silver round analog watch</strong></a></td>
              <td>$22.00</td>
              <td>51</td>
              <td className="text-muted">2021/01/02</td>
              <td>
                <label className="badge badge-primary-light">New Arrival</label>
              </td>
              <td><a className="me-3 text-lg text-success" href="#!"><i className="far fa-edit"></i></a><a className="text-lg text-danger" href="#!"><i className="far fa-trash-alt"></i></a></td>
            </tr>
            <tr className="align-middle">
              <td>#2577</td>
              <td className="d-flex align-items-center"><img className="card-table-img img-fluid rounded me-3" src="https://demo.bootstrapious.com/bubbly/1-3-2/img/product/product-10.jpg" alt="" width="70"/><a className="text-reset text-decoration-none" href="#!"><strong>Apple Watch</strong></a></td>
              <td>$22.00</td>
              <td>52</td>
              <td className="text-muted">2021/01/29</td>
              <td>
              </td>
              <td><a className="me-3 text-lg text-success" href="#!"><i className="far fa-edit"></i></a><a className="text-lg text-danger" href="#!"><i className="far fa-trash-alt"></i></a></td>
            </tr>
            <tr className="align-middle">
              <td>#2578</td>
              <td className="d-flex align-items-center"><img className="card-table-img img-fluid rounded me-3" src="https://demo.bootstrapious.com/bubbly/1-3-2/img/product/product-11.jpg" alt="" width="70"/><a className="text-reset text-decoration-none" href="#!"><strong>Joemalone Women prefume</strong></a></td>
              <td>$22.00</td>
              <td>53</td>
              <td className="text-muted">2021/02/08</td>
              <td>
                <label className="badge badge-info-light">Trending</label>
              </td>
              <td><a className="me-3 text-lg text-success" href="#!"><i className="far fa-edit"></i></a><a className="text-lg text-danger" href="#!"><i className="far fa-trash-alt"></i></a></td>
            </tr>
            <tr className="align-middle">
              <td>#2579</td>
              <td className="d-flex align-items-center"><img className="card-table-img img-fluid rounded me-3" src="https://demo.bootstrapious.com/bubbly/1-3-2/img/product/product-12.jpg" alt="" width="70"/><a className="text-reset text-decoration-none" href="#!"><strong>Nike air max 95</strong></a></td>
              <td>$22.00</td>
              <td>54</td>
              <td className="text-muted">2021/03/14</td>
              <td>
              </td>
              <td><a className="me-3 text-lg text-success" href="#!"><i className="far fa-edit"></i></a><a className="text-lg text-danger" href="#!"><i className="far fa-trash-alt"></i></a></td>
            </tr>
            <tr className="align-middle">
              <td>#2580</td>
              <td className="d-flex align-items-center"><img className="card-table-img img-fluid rounded me-3" src="https://demo.bootstrapious.com/bubbly/1-3-2/img/product/product-13.jpg" alt="" width="70"/><a className="text-reset text-decoration-none" href="#!"><strong>Red digital smartwatch</strong></a></td>
              <td>$22.00</td>
              <td>55</td>
              <td className="text-muted">2021/06/14</td>
              <td>
                <label className="badge badge-danger-light">Soldout</label>
              </td>
              <td><a className="me-3 text-lg text-success" href="#!"><i className="far fa-edit"></i></a><a className="text-lg text-danger" href="#!"><i className="far fa-trash-alt"></i></a></td>
            </tr>
            <tr className="align-middle">
              <td>#2581</td>
              <td className="d-flex align-items-center"><img className="card-table-img img-fluid rounded me-3" src="https://demo.bootstrapious.com/bubbly/1-3-2/img/product/product-14.jpg" alt="" width="70"/><a className="text-reset text-decoration-none" href="#!"><strong>Air Jordan 12 gym red</strong></a></td>
              <td>$22.00</td>
              <td>56</td>
              <td className="text-muted">2021/09/09</td>
              <td>
              </td>
              <td><a className="me-3 text-lg text-success" href="#!"><i className="far fa-edit"></i></a><a className="text-lg text-danger" href="#!"><i className="far fa-trash-alt"></i></a></td>
            </tr>
            <tr className="align-middle">
              <td>#2582</td>
              <td className="d-flex align-items-center"><img className="card-table-img img-fluid rounded me-3" src="https://demo.bootstrapious.com/bubbly/1-3-2/img/product/product-15.jpg" alt="" width="70"/><a className="text-reset text-decoration-none" href="#!"><strong>Kui Ye Chen’s AirPods</strong></a></td>
              <td>$22.00</td>
              <td>57</td>
              <td className="text-muted">2021/11/03</td>
              <td>
                <label className="badge badge-warning-light">Hot</label>
              </td>
              <td><a className="me-3 text-lg text-success" href="#!"><i className="far fa-edit"></i></a><a className="text-lg text-danger" href="#!"><i className="far fa-trash-alt"></i></a></td>
            </tr>
            <tr className="align-middle">
              <td>#2583</td>
              <td className="d-flex align-items-center">
                <img className="card-table-img img-fluid rounded me-3" src="https://demo.bootstrapious.com/bubbly/1-3-2/img/product/product-10.jpg" alt="" width="70"/><a className="text-reset text-decoration-none" href="#!"><strong>Apple watch</strong></a></td>
              <td>$22.00</td>
              <td>58</td>
              <td className="text-muted">2021/10/09</td>
              <td>
              </td>
              <td><a className="me-3 text-lg text-success" href="#!"><i className="far fa-edit"></i></a><a className="text-lg text-danger" href="#!"><i className="far fa-trash-alt"></i></a></td>
            </tr>
          </tbody>
        </table><span className="me-2" id="categoryBulkAction">
          <select className="form-select form-select-sm d-inline w-auto" name="categoryBulkAction">
            <option>Bulk Actions</option>
            <option>Delete</option>
          </select>
          <button className="btn btn-sm btn-outline-primary align-top">Apply</button></span>
      </div>
    </div>
  </section>
</div>

</div>