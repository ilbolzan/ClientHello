import "./style.scss";
import React, { useEffect, useState } from "react";
import * as api from '../../sevices'
import { Edit, Play,Trash,UserPlus } from 'react-feather';
import { useParams } from "react-router-dom";
import ModalCadastroJogador from "../../components/ModalCadastroJogador";
import ModalJogador from "../../components/ModalJogador";
import ModalDeleteJogador from "../../components/ModalDeleteJogador";
import Backdrop from "../../components/backdrop";
import Alert from "../../components/alert";

type TournamentType = {
  id: number, name: string, date: string, racers: ReacersType[]
}
type ReacersType = {
  average_speed: number,
  category: string,
  id:number,
  key:string,
  name:string,
  times_played:number
  victories:number,
  dead: boolean,
  wos: number
}

function Tournament() {
  const {id} = useParams()
  const [backdropStatus, setBackdropStatus] = useState(true);
  const [tournament, setTournament] = useState<TournamentType|''>('');
  const [viewPlayerData, setViewPlayerData] = useState<ReacersType|''>('');
  const [editPlayerData, setEditPlayerData] = useState<ReacersType|''>('');
  const [deletePlayerData, setDeletePlayerData] = useState<ReacersType|''>('');
  const [modalCadastroJogador, setModalCadastroJogador] = useState(false);
  const [messageStatus, setMessageStatus] = useState('');

  const getTournament = async () => {
    try{
    setBackdropStatus(true)
    const tournament = await api.getTorunament(id||'')
    setTournament(tournament)
  }catch{
    setMessageStatus("Erro ao carregar torneios")
  }finally{
    setBackdropStatus(false)
  }
    
  }

  const handleEdit = (e:React.MouseEvent<SVGElement, MouseEvent>,player:ReacersType) => {
    e.stopPropagation()
    setEditPlayerData(player)
  }
  const handleDelete = (e:React.MouseEvent<SVGElement, MouseEvent>,player:ReacersType) => {
    e.stopPropagation()
    setDeletePlayerData(player)
  }

  useEffect(() => {
    getTournament()
  }, [id]);


  return (
    <div className="tournament_container">
      <Alert open={!!messageStatus} close={()=>setMessageStatus('')} message={messageStatus}/>
      <Backdrop open={backdropStatus}/>
      {tournament?
      <>
      {!!deletePlayerData ?
          <ModalDeleteJogador
          open={!!deletePlayerData}
          close={() => setDeletePlayerData('')}
          player={deletePlayerData}
          getTournament={getTournament}
          setBackdropStatus={setBackdropStatus}
          setMessageStatus={setMessageStatus}
        />:<></>}
      {!!editPlayerData ?
          <ModalJogador
          open={!!editPlayerData}
          close={() => setEditPlayerData('')}
          player={editPlayerData}
          edit={true}
          getTournament={getTournament}
          setBackdropStatus={setBackdropStatus}
          setMessageStatus={setMessageStatus}
          />:<></>}
      {!!viewPlayerData ?
          <ModalJogador
          open={!!viewPlayerData}
          close={() => setViewPlayerData('')}
          player={viewPlayerData}
        />:<></>}
      {modalCadastroJogador ?
          <ModalCadastroJogador
          open={modalCadastroJogador}
          close={() => setModalCadastroJogador(false)}
          tournamentId={id||''}
          setBackdropStatus={setBackdropStatus}
          getTournament={getTournament}
          setMessageStatus={setMessageStatus}
          />:<></>}
      <header>
        <section className="small">
          <h2>{tournament.name}</h2>
          <span>{new Date(tournament.date).toLocaleDateString()}</span>
        </section>
        <nav>
        <div onClick={()=>setModalCadastroJogador(true)}  className="button"><UserPlus color='black'/></div>
          <div className="button"><Play color='black'/></div>
        </nav>
      </header>
      <main>
      {tournament.racers?<>
      <ul className="card">
        <h3>Sem gênero</h3>
          {tournament.racers.map(player=>{
            if(player.category!=='sem') return ''
            return <li key={player.key} onClick={()=>setViewPlayerData(player)}><h5>{player.name} <nav><Trash  onClick={(e)=>handleDelete(e,player)} className="icon"/> <Edit onClick={(e)=>handleEdit(e,player)}className="icon" /></nav></h5><hr></hr></li>
          })}
        </ul>
        <ul className="card">
        <h3>Feminino</h3>
          {tournament.racers.map(player=>{
            if(player.category!=='fem') return ''
            return <li key={player.key} onClick={()=>setViewPlayerData(player)}><h5>{player.name} <nav><Trash  onClick={(e)=>handleDelete(e,player)} className="icon"/> <Edit onClick={(e)=>handleEdit(e,player)}className="icon" /></nav></h5><hr></hr></li>
          })}
        </ul>
        <ul className="card">
        <h3>Masculino</h3>
          {tournament.racers.map(player=>{
            if(player.category!=='mas') return ''
            return <li key={player.key} onClick={()=>setViewPlayerData(player)}><h5>{player.name} <nav><Trash  onClick={(e)=>handleDelete(e,player)} className="icon"/> <Edit onClick={(e)=>handleEdit(e,player)}className="icon" /></nav></h5><hr></hr></li>
          })}
        </ul>
      </>:<></>}
        
      </main>
      </>:<></>
      }
      
        
    </div>
  );
}

export default Tournament;
