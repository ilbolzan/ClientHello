import { Formik, Form, FormikHelpers, Field } from 'formik'
import { useNavigate } from 'react-router-dom'

import { useAlert } from '../../hooks/useAlert'
import { useBackdrop } from '../../hooks/useBackdrop'
import * as api from '../../sevices'
import './style.scss'
import { TournamentType } from '../../types/useMatch'

type ModalCadastroTorneioType = {
  close: () => void
  open: boolean
}

function ModalCadastroTorneio({ open, close }: ModalCadastroTorneioType) {
  const navigate = useNavigate()
  const { setupMessage } = useAlert()
  const { setupClose, setupOpen } = useBackdrop()
  const initialValues: TournamentType = { title: '', createdAt: new Date() }

  const handleSubmit = async (
    values: TournamentType,
    { setSubmitting }: FormikHelpers<TournamentType>
  ) => {
    try {
      setupOpen()
      await api.postTournaments(values)

      navigate('/load')
      setSubmitting(false)
    } catch {
      setupMessage('Erro ao cadastrar Torneio')
    } finally {
      setupClose()
    }
  }

  if (open) {
    return (
      <div className="modalCadastroTorneio-container">
        <main>
          <h3>Cadastre o campeonato</h3>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <label htmlFor="firstName">Nome</label>
              <Field id="tournament_title" name="title" placeholder="Nome" />
              <button type="button" className="danger" onClick={close}>
                Cancelar
              </button>
              <button type="submit">Cadastrar</button>
            </Form>
          </Formik>
        </main>
      </div>
    )
  } else return <></>
}

export default ModalCadastroTorneio
