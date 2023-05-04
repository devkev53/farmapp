import { useEffect, useState } from "react";
import { EditBaseModal } from "../../components/UI/EditBaseModal";
import { ModalContainer } from "../ModalContainer";
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad";
import { getByIdUser } from "../../services/users.service";

export const EditUserModal = ({data}:{data:{}}) => {

  const [userData, setUserData] = useState(data)
  const [name, setName] = useState(data?.name)
  const [lastName, setLastName] = useState(data?.last_name)
  const [phone, setPhone] = useState(data?.phone)
  const [address, setAddress] = useState(data?.address)
  const [birthday, setBirthday] = useState(data?.birthday)
  
  return (
    <>
      <form action="">

        <div className="input_group">
          <div className="">
            <input className='' name='name' type="text" onChange={(e) => {setName(e.target.value)}} value={name}/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Nombres</label>
          </div>
          <span className="helptext"></span>
        </div>

        <div className="input_group">
          <div className="">
            <input className='' name='last_name' type="text" onChange={(e) => {setLastName(e.target.value)}} value={lastName}/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Apellidos</label>
          </div>
          <span className="helptext"></span>
        </div>

        <div className="input_group">
          <div className="">
            <input className='' name='phone' type="text" onChange={(e) => {setPhone(e.target.value)}} value={phone}/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Teléfono</label>
          </div>
          <span className="helptext"></span>
        </div>

        <div className="input_group">
          <div className="">
            <input className='' name='address' type="text" onChange={(e) => {setAddress(e.target.value)}} value={address}/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Dirección</label>
          </div>
          <span className="helptext"></span>
        </div>

        <div className="input_group">
          <div className="">
            <input className='' name='birthday' type="date"/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Fecha de Nacimiento</label>
          </div>
          <span className="helptext"></span>
        </div>

      </form>
    </>
  );
}
