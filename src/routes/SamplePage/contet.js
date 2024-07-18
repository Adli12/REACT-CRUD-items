import React from "react";
import "../../styles/apps/samplePage.less"  
import IntlMessages from "util/IntlMessages";

const content = () => {
  return (
    <div>
      <h2 className="title gx-mb-4"><IntlMessages id="Peminjaman Barang"/></h2>

      <div className="content gx-d-flex justify-content-center">
       h
      </div>  
       <div className="main">
        <table className="box">
         <thead >
          <tr>
            <th>no</th>
            <th>kode barang</th>
            <th>nama barang</th>
            <th>jenis barang</th>
            <th>action</th>
          </tr>
         </thead>
          <tbody>
            <tr>
            
            </tr>
          </tbody>
        </table>
       </div>
    </div>
  );
};

export default content;
