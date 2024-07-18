import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemRequest } from '../appRedux/actions/action';

const PeminjamanBarangForm = () => {
  const [namaBarang, setNamaBarang] = useState('');
  const [peminjam, setPeminjam] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { namaBarang, peminjam };
    dispatch(addItemRequest(newItem));
    setNamaBarang('');
    setPeminjam('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nama Barang</label>
        <input
          type="text"
          value={namaBarang}
          onChange={(e) => setNamaBarang(e.target.value)}
        />
      </div>
      <div>
        <label>Peminjam</label>
        <input
          type="text"
          value={peminjam}
          onChange={(e) => setPeminjam(e.target.value)}
        />
      </div>
      <button type="submit">Tambah</button>
    </form>
  );
};

export default PeminjamanBarangForm;