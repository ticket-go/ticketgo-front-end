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

      // Redireciona para a home após a criação bem-sucedida
      window.location.href = "/";

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
    <div className="w-full flex-col bg-background mt-40 mb-40 px-[300px] tab-land:px-[80px] tab-port:px-[48px] mobile:px-[32px] litemobile:px-[20px] ">
      <h1 className="text-4xl font-bold mb-6 text-start">Criar Evento</h1>
      {successMessage && (
        <p className="mb-6 text-green-600 text-center">{successMessage}</p>
      )}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        encType="multipart/form-data"
      >
        <div className="col-span-2 flex flex-col gap-2">
          <label className="font-medium">Imagem do Evento</label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-64 bg-gray-700 text-gray-200 border border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-gray-500 hover:bg-gray-600"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="object-cover w-full h-full rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7h2l1-2h12l1 2h2a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2zm9 11a4 4 0 100-8 4 4 0 000 8z"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-300 text-center">
                    Selecione um banner para seu evento no tamanho 1680x480.
                  </p>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                name="image"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="col-span-2 flex flex-col gap-2">
          <label className="font-medium">Digite o nome do evento</label>
          <input
            type="text"
            name="name"
            placeholder="Nome do evento"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full bg-white text-black font-semibold h-16 rounded-sm placeholder:text-gray placeholder:font-semibold pl-4" 
          />
        </div>

        <div className="flex flex-col gap-2 mobile:col-span-2">
          <label className="font-medium">Data</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="w-full bg-white text-black font-semibold h-16 rounded-sm placeholder:text-gray placeholder:font-semibold pl-4"
          />
        </div>

        <div className="flex flex-col gap-2 mobile:col-span-2">
          <label className="font-medium">Hora</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
            className="w-full bg-white text-black font-semibold h-16 rounded-sm placeholder:text-gray placeholder:font-semibold pl-4"
          />
        </div>

        <div className="col-span-2 flex flex-col gap-2">
          <label className="font-medium">Descrição</label>
          <textarea
            name="description"
            value={formData.description}
            placeholder="Descreva o evento"
            onChange={handleInputChange}
            required
            className="w-full bg-white text-black font-semibold h-24 rounded-sm placeholder:text-gray placeholder:font-semibold pl-4 pt-4"
          />
        </div>

        <div className="flex flex-col gap-2 mobile:col-span-2">
          <label className="font-medium">Categoria</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full bg-white text-black font-semibold h-16 rounded-sm placeholder:text-gray placeholder:font-semibold pl-4 pr-4"
          >
            <option value="music">Música</option>
            <option value="sports">Esportes</option>
            <option value="entertainment">Entretenimento</option>
            <option value="workshop">Workshop</option>
            <option value="other">Outros</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 mobile:col-span-2">
          <label className="font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full bg-white text-black font-semibold h-16 rounded-sm placeholder:text-gray placeholder:font-semibold pl-4 pr-4"
          >
            <option value="scheduled">Agendado</option>
            <option value="concluded">Concluído</option>
          </select>
        </div>

        <div className="col-span-2 flex flex-col gap-2">
          <label className="font-medium">Endereço</label>
          <select
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="w-full bg-white text-black font-semibold h-16 rounded-sm placeholder:text-gray placeholder:font-semibold pl-4 pr-4"
          >
            <option value="">Selecione o endereço</option>
            {addresses.map((address) => (
              <option key={address.uuid} value={address.uuid}>
                {address.street}, {address.number} - {address.city} ({address.state})
              </option>
            ))}
          </select>
        </div>

        <h1 className="col-span-2 text-4xl font-bold mb-6 mt-6 text-start">Ingressos</h1>

        <h1 className="col-span-2 text-2xl font-bold text-start">Inteira</h1>

        <div className="flex flex-col gap-2 mobile:col-span-2">
          <label className="font-medium">Valor do ingresso</label>
          <input
            type="number"
            name="ticket_value"
            value={formData.ticket_value}
            placeholder="R$ 00,00"
            onChange={handleInputChange}
            required
            className="w-full bg-white text-black font-semibold h-16 rounded-sm placeholder:text-gray placeholder:font-semibold pl-4 pr-4"
          />
        </div>

        <div className="flex flex-col gap-2 mobile:col-span-2">
          <label className="font-medium">Quantidade de Ingressos Inteiros</label>
          <input
            type="number"
            name="ticket_quantity"
            value={formData.ticket_quantity}
            placeholder="0"
            onChange={handleInputChange}
            required
            className="w-full bg-white text-black font-semibold h-16 rounded-sm placeholder:text-gray placeholder:font-semibold pl-4 pr-4"
          />
        </div>

        <h1 className="col-span-2 text-2xl font-bold text-start">Meia</h1>

        <div className="flex flex-col gap-2 mobile:col-span-2">
          <label className="font-medium">Valor do Ingresso Meia-Entrada</label>
          <input
            type="number"
            name="half_ticket_value"
            value={formData.half_ticket_value}
            placeholder="R$ 00,00"
            onChange={handleInputChange}
            required
            className="w-full bg-white text-black font-semibold h-16 rounded-sm placeholder:text-gray placeholder:font-semibold pl-4 pr-4"
          />
        </div>

        <div className="flex flex-col gap-2 mobile:col-span-2">
          <label className="font-medium">Quantidade de Ingressos Meia-Entrada</label>
          <input
            type="number"
            name="half_ticket_quantity"
            value={formData.half_ticket_quantity}
            placeholder="0"
            onChange={handleInputChange}
            required
            className="w-full bg-white text-black font-semibold h-16 rounded-sm placeholder:text-gray placeholder:font-semibold pl-4 pr-4"
          />
        </div>

        <div className="col-span-2">
          <label className="flex items-center font-medium">
            <input
              type="checkbox"
              name="is_hero_event"
              checked={formData.is_hero_event}
              onChange={handleInputChange}
              className="mr-2 h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 checked:bg-purple-500"
            />
            Evento Destaque Principal
          </label>
        </div>

        <div className="col-span-2">
          <label className="flex items-center font-medium">
            <input
              type="checkbox"
              name="is_top_event"
              checked={formData.is_top_event}
              onChange={handleInputChange}
              className="mr-2 h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 checked:bg-purple-500"
            />
            Evento Destaque
          </label>
        </div>

        <div className="col-span-2 flex justify-between gap-8">
          <button
            type="button"
            onClick={() =>
              setFormData({
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
              })
            }
            className="w-full py-6 bg-gray-500 text-white rounded-md hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-6 rounded-md text-white ${loading ? 'bg-purple-gradient' : 'bg-purple-gradient hover:bg-purple'}`}
          >
            {loading ? "Criando..." : "Criar Evento"}
          </button>
        </div>
      </form>
    </div>
  );
}
