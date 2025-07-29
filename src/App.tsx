import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { HomePage } from './pages/HomePage';
import { EstablishmentPage } from './pages/EstablishmentPage';

function App() {
    return (
        <AppProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/establishment/:id" element={<EstablishmentPage />} />
                    </Routes>
                </div>
            </Router>
        </AppProvider>
    );
}

export default App;
