"use client";

import { useState, useEffect } from "react";
import { fetchAddresses } from "@/actions/fetch-addresses";
import { fetchCreateEvent } from "@/actions/fetch-create-event"; 

export default function CreateEventForm() {
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    description: "",
    category: "other",
    status: "scheduled",
    ticket_value: "",
    half_ticket_value: "",
    ticket_quantity: "",
    half_ticket_quantity: "",
    address: "",
    image: null,
    is_hero_event: false,
    is_top_event: false,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");


  useEffect(() => {
    const loadAddresses = async () => {
      const data = await fetchAddresses();
      setAddresses(data);
    };
    loadAddresses();
  }, []);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
    setImagePreview(URL.createObjectURL(file));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();

  
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      await fetchCreateEvent(formDataToSend); 
      setSuccessMessage("Evento criado com sucesso!");
      setFormData({
        name: "",
        date: "",
        time: "",
        description: "",
        category: "other",
        status: "scheduled",
        ticket_value: "",
        half_ticket_value: "",
        ticket_quantity: "",
        half_ticket_quantity: "",
        address: "",
        image: null,
        is_hero_event: false,
        is_top_event: false,
      });
      setImagePreview(null);
    } catch (error) {
      console.error("Erro ao criar o evento:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-40 mb-40">
      <h1 className="text-3xl font-bold mb-6 text-center">Criar Evento</h1>
      {successMessage && (
        <p className="mb-6 text-green-600 text-center">{successMessage}</p>
      )}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        encType="multipart/form-data"
      >
    
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Nome do Evento</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700">Data</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

    
        <div>
          <label className="block text-sm font-medium text-gray-700">Hora</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

    
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 h-24"
          />
        </div>

    
        <div>
          <label className="block text-sm font-medium text-gray-700">Categoria</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="music">Música</option>
            <option value="sports">Esportes</option>
            <option value="entertainment">Entretenimento</option>
            <option value="workshop">Workshop</option>
            <option value="other">Outros</option>
          </select>
        </div>

      
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="scheduled">Agendado</option>
            <option value="concluded">Concluído</option>
          </select>
        </div>

   
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Endereço</label>
          <select
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Selecione o endereço</option>
            {addresses.map((address) => (
              <option key={address.uuid} value={address.uuid}>
                {address.street}, {address.number} - {address.city} ({address.state})
              </option>
            ))}
          </select>
        </div>

      
        <div>
          <label className="block text-sm font-medium text-gray-700">Valor do Ingresso Inteiro</label>
          <input
            type="number"
            name="ticket_value"
            value={formData.ticket_value}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Quantidade de Ingressos Inteiros</label>
          <input
            type="number"
            name="ticket_quantity"
            value={formData.ticket_quantity}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

      
        <div>
          <label className="block text-sm font-medium text-gray-700">Valor do Ingresso Meia-Entrada</label>
          <input
            type="number"
            name="half_ticket_value"
            value={formData.half_ticket_value}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Quantidade de Ingressos Meia-Entrada</label>
          <input
            type="number"
            name="half_ticket_quantity"
            value={formData.half_ticket_quantity}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>


        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Imagem do Evento</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 max-w-xs rounded-md shadow-md"
            />
          )}
        </div>

  
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              name="is_hero_event"
              checked={formData.is_hero_event}
              onChange={handleInputChange}
              className="mr-2"
            />
            Evento Destaque Principal
          </label>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              name="is_top_event"
              checked={formData.is_top_event}
              onChange={handleInputChange}
              className="mr-2"
            />
            Evento Destaque
          </label>
        </div>

        <div className="col-span-2 flex justify-between">
          <button
            type="button"
            onClick={() => setFormData({
              ...formData,
              name: "",
              date: "",
              time: "",
              description: "",
              ticket_value: "",
              half_ticket_value: "",
              ticket_quantity: "",
              half_ticket_quantity: "",
              address: "",
              image: null,
              is_hero_event: false,
              is_top_event: false,
            })}
            className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`py-2 px-4 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-800'}`}
          >
            {loading ? "Criando..." : "Criar Evento"}
          </button>
        </div>
      </form>
    </div>
  );
}
