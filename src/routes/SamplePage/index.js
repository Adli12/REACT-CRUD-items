import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Modal, Form, Spin } from 'antd';
import api from '../../services/Api';
import { ExclamationCircleFilled } from '@ant-design/icons';

const ItemTable = () => {
  const [items, setItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await api.create().fetchItems();
      if (response.ok) {
        setItems(response.data);
      } else {
        console.error("Failed to fetch items", response.problem);
      }
    } catch (error) {
      console.error("Failed to fetch items", error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (values) => {
    try {
      const response = await api.create().addItem(values);
      if (response.ok) {
        fetchItems();
        form.resetFields();
      } else {
        console.error("Failed to add item", response.problem);
        // Tampilkan pesan error kepada pengguna
      }
    } catch (error) {
      console.error("Failed to add item", error);
    }
  };

  const updateItem = async (id) => {
    try {
      console.log('Update item data:', id); 
      const response = await api.create().updateItem(id);
      if (response.ok) {
        fetchItems();  
        setIsModalVisible(false);  // Menutup modal setelah update berhasil
      } else {
        console.error("Failed to update item", response.problem);
        // Tampilkan pesan error kepada pengguna, misalnya menggunakan notifikasi atau state
      }
    } catch (error) {
      console.error("Failed to update item", error);
      // Tampilkan pesan error kepada pengguna, misalnya menggunakan notifikasi atau state
    }
  };

  const deleteItem = async (id) => {
    Modal.confirm({
      title: 'Delete Item',
      content: 'Are you sure to delete this item?',
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk() {
        deleteItemConfirmed(id);
      },
    });
  };

  const deleteItemConfirmed = async (id) => {
    try {
      const response = await api.create().deleteItem(id);
      if (response.ok) {
        fetchItems();
      } else {
        console.error("Failed to delete item", response.problem);
        // Tampilkan pesan error kepada pengguna
      }
    } catch (error) {
      console.error("Failed to delete item", error);
      // Tampilkan pesan error kepada pengguna
    }
  };

  const showEditModal = (item) => {
    setEditingItem(item);
    setIsModalVisible(true);
    form.setFieldsValue(item);
  };

  const handleEditOk = () => {
    form
      .validateFields()
      .then(values => {
        values._id = editingItem._id; // Assign the id to the values
        updateItem(values);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleEditCancel = () => {
    setIsModalVisible(false);
    setEditingItem(null);
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Kode Barang',
      dataIndex: 'kodeBarang',
      key: 'kodeBarang',
    },
    {
      title: 'Nama Barang',
      dataIndex: 'namaBarang',
      key: 'namaBarang',
    },
    {
      title: 'Jenis Barang',
      dataIndex: 'jenisBarang',
      key: 'jenisBarang',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => showEditModal(record)}>Update</Button>
          <Button type="danger" onClick={() => deleteItem(record._id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div class="name">
        <h3>Peminjaman Barang</h3>
      </div>
      <Form
        form={form}
        layout="inline"
        onFinish={addItem}
      >
        <Form.Item name="kodeBarang" rules={[{ required: true, message: 'Please input Kode Barang!' }]}>
          <Input placeholder="Kode Barang" />
        </Form.Item>
        <Form.Item name="namaBarang" rules={[{ required: true, message: 'Please input Nama Barang!' }]}>
          <Input placeholder="Nama Barang" />
        </Form.Item>
        <Form.Item name="jenisBarang" rules={[{ required: true, message: 'Please input Jenis Barang!' }]}>
          <Input placeholder="Jenis Barang" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Item
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={items} columns={columns} rowKey="_id" loading={loading} />
      <Modal
        title="Edit Item"
        visible={isModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="kodeBarang" label="Kode Barang" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="namaBarang" label="Nama Barang" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="jenisBarang" label="Jenis Barang" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ItemTable;
