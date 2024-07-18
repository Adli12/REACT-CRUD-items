import React, { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Input, Modal, Form, Spin } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import {
  fetchItemsRequest,
  addItemRequest,
  updateItemRequest,
  deleteItemRequest,
} from '../appRedux/actions/action';

const ItemTable = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const error = useSelector((state) => state.error);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchItemsRequest());
  }, [dispatch]);

  const addItem = (values) => {
    dispatch(addItemRequest(values));
    form.resetFields();
  };

  const updateItem = (values) => {
    values._id = editingItem._id; // Assign the id to the values
    dispatch(updateItemRequest(values));
    setIsModalVisible(false);
  };

  const deleteItem = (id) => {
    Modal.confirm({
      title: 'Delete Item',
      content: 'Are you sure to delete this item?',
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk() {
        dispatch(deleteItemRequest(id));
      },
    });
  };

  const showEditModal = (item) => {
    setEditingItem(item);
    setIsModalVisible(true);
    form.setFieldsValue(item);
  };

  const handleEditOk = () => {
    form.validateFields()
      .then((values) => updateItem(values))
      .catch((info) => console.log('Validate Failed:', info));
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
      <div className="name">
        <h3>Peminjaman Barang</h3>
      </div>
      <Form form={form} layout="inline" onFinish={addItem}>
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
          <Button type="primary" htmlType="submit">Tambah</Button>
        </Form.Item>
      </Form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table columns={columns} dataSource={items} rowKey="_id" />
      )}
      <Modal title="Edit Item" visible={isModalVisible} onOk={handleEditOk} onCancel={handleEditCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="kodeBarang" label="Kode Barang" rules={[{ required: true, message: 'Please input Kode Barang!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="namaBarang" label="Nama Barang" rules={[{ required: true, message: 'Please input Nama Barang!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="jenisBarang" label="Jenis Barang" rules={[{ required: true, message: 'Please input Jenis Barang!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ItemTable;
