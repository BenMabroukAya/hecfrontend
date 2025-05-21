import {
  cilArrowCircleRight,
  cilEnvelopeOpen,
  cilHome,
  cilPhone,
  cilSettings,
  cilSpeedometer,
  cilUser
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CNavItem,
  CProgress,
  CRow,
  CSidebar,
  CSidebarHeader,
  CSidebarNav,
  CWidgetStatsA
} from '@coreui/react'

const Dashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <CSidebar style={{ backgroundColor: '#595959', color: 'white', minHeight: '100vh' }}>
        <CSidebarHeader className="text-center py-4">
          <img src="https://res.cloudinary.com/dmfvxi601/image/upload/v1747835466/logo_fan0tu.jpg" alt="HEC" style={{ height: '50px' }} />
          <h5 style={{ color: '#ff3c1f', marginTop: '10px' }}>HEC ELECTRICITE</h5>
        </CSidebarHeader>
        <CSidebarNav>
          <CNavItem href="/Home" icon={<CIcon icon={cilHome} />}>Accueil</CNavItem>
          <CNavItem href="/users" icon={<CIcon icon={cilUser} />}>Utilisateurs</CNavItem>
          <CNavItem href="/messages" icon={<CIcon icon={cilEnvelopeOpen} />}>Messages</CNavItem>
          <CNavItem href="#" icon={<CIcon icon={cilPhone} />}>Rendez-vous</CNavItem>
          <CNavItem href="#" icon={<CIcon icon={cilSettings} />}>Paramètres</CNavItem>
          <CNavItem href="/logout" icon={<CIcon icon={cilArrowCircleRight} />}>Déconnexion</CNavItem>
        </CSidebarNav>
      </CSidebar>

      {/* Main Content */}
      <CContainer fluid className="p-4" style={{ backgroundColor: '#f5f5f5' }}>
        <h2>Dashboard</h2>
        <CRow className="my-4">
          <CCol sm={4}>
            <CWidgetStatsA
              className="mb-4"
              color="primary"
              value="67,343"
              title="Ventes"
              icon={<CIcon icon={cilSpeedometer} height={36} />}
            />
          </CCol>
          <CCol sm={4}>
            <CWidgetStatsA
              className="mb-4"
              color="danger"
              value="2,343"
              title="Achats"
              icon={<CIcon icon={cilUser} height={36} />}
            />
          </CCol>
          <CCol sm={4}>
            <CWidgetStatsA
              className="mb-4"
              color="success"
              value="35,343"
              title="Commandes"
              icon={<CIcon icon={cilEnvelopeOpen} height={36} />}
            />
          </CCol>
        </CRow>

        <CRow>
          <CCol sm={4}>
            <CCard>
              <CCardHeader>Vue globale</CCardHeader>
              <CCardBody>
                <p>Membre Profits: +1345</p>
                <p>Membre Profits: -1345</p>
                <p>Membre Profits: -2345</p>
              </CCardBody>
            </CCard>
          </CCol>

          <CCol sm={4}>
            <CCard>
              <CCardHeader>Total des ventes</CCardHeader>
              <CCardBody>
                <CProgress value={70} className="mb-3" color="success" />
                <p>70%</p>
              </CCardBody>
            </CCard>
          </CCol>

          <CCol sm={4}>
            <CCard>
              <CCardHeader>Activités</CCardHeader>
              <CCardBody>
                <ul>
                  <li>Nouvel utilisateur ajouté</li>
                  <li>Rendez-vous reçu</li>
                  <li>Message consulté</li>
                </ul>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Dashboard;
