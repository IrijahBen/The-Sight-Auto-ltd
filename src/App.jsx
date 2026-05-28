import { useMemo } from 'react';

// Styles
import './styles/globals.css';

// Hooks & utils
import { useLocalStorage, useNotify, useTheme } from './hooks';
import { ls } from './utils';

// Components
import Navbar        from './components/Navbar';
import CartDrawer    from './components/CartDrawer';
import ToastContainer from './components/ToastContainer';
import Footer        from './components/Footer';

// Pages
import HomePage      from './pages/HomePage';
import CarsPage      from './pages/CarsPage';
import CarDetailPage from './pages/CarDetailPage';

import {
  OffersPage,
  ConfigurePage,
  BranchesPage,
  EventsPage,
  GalleryPage,
} from './pages/SupportPages';

import {
  NewsPage,
  FaqPage,
  FavoritesPage,
  ProfilePage,
  AuthPage,
} from './pages/ContentPages';

import { BRANCHES } from './data';

export default function App() {
  // Theme
  const { dark, toggleTheme } = useTheme();

  // Auth
  const [user,     setUser]     = useLocalStorage('eu',   null);
  const [authMode, setAuthMode] = useLocalStorage('eam',  'login');

  // Navigation
  const [page,    setPage]    = useLocalStorage('ep',  'home');
  const [selCar,  setSelCar]  = useLocalStorage('esc', null);
  const [cartOpen,setCartOpen]= useLocalStorage('eco', false);

  // Cart
  const [cart, setCart] = useLocalStorage('ec', []);
  const { notes, push: notify } = useNotify();

  const addCart = (car) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === car.id);
      if (existing) {
        return prev.map((c) =>
          c.id === car.id ? { ...c, quantity: (c.quantity || 1) + 1 } : c
        );
      }
      return [...prev, { ...car, quantity: 1 }];
    });
    notify(`${car.model} added to cart ✓`, 'success');
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, quantity: (c.quantity || 1) + 1 } : c
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((c) =>
          c.id === id ? { ...c, quantity: (c.quantity || 1) - 1 } : c
        )
        .filter((c) => (c.quantity || 1) > 0)
    );
  };

  const removeCart = (id) => setCart((prev) => prev.filter((c) => c.id !== id));

  const handleCheckout = () => {
    notify('Order placed! Our team will contact you shortly ✓', 'success');
    setCart([]);
    setCartOpen(false);
  };

  // Favorites
  const [favs, setFavs] = useLocalStorage('ef', []);
  const toggleFav = (car) => {
    const has = favs.some((f) => f.id === car.id);
    setFavs((prev) => has ? prev.filter((f) => f.id !== car.id) : [...prev, car]);
    notify(has ? 'Removed from wishlist' : 'Added to wishlist ♥');
  };
  const isFav = (id) => favs.some((f) => f.id === id);

  // Comments & Ratings
  const [comments, setComments] = useLocalStorage('ecm', {});
  const [ratings,  setRatings]  = useLocalStorage('er',  {});

  // Nearest branch
  const nearestBranch = useMemo(
    () => user ? (BRANCHES.find((b) => b.gov === user.gov) || BRANCHES[0]) : null,
    [user]
  );

  // Navigation helper
  const go = (pageId) => {
    setPage(pageId);
    setSelCar(null);
    setCartOpen(false);
  };

  // Sign out
  const handleSignOut = () => {
    setUser(null);
    ls.set('eu', null);
    go('home');
    notify('Signed out successfully');
  };

  // Render current page
  const renderPage = () => {
    if (selCar) {
      return (
        <CarDetailPage
          car={selCar}
          user={user}
          addCart={addCart}
          toggleFav={toggleFav}
          isFav={isFav}
          comments={comments}
          setComments={setComments}
          ratings={ratings}
          setRatings={setRatings}
          notify={notify}
          onBack={() => setSelCar(null)}
        />
      );
    }

    switch (page) {
      case 'home':
        return (
          <HomePage
            go={go}
            dark={dark}
            onCarClick={setSelCar}
            addCart={addCart}
            toggleFav={toggleFav}
            isFav={isFav}
            notify={notify}
          />
        );
      case 'cars':
        return <CarsPage onCarClick={setSelCar} addCart={addCart} toggleFav={toggleFav} isFav={isFav} />;
      case 'offers':
        return <OffersPage addCart={addCart} />;
      case 'configure':
        return <ConfigurePage addCart={addCart} notify={notify} />;
      case 'branches':
        return <BranchesPage user={user} />;
      case 'events':
        return <EventsPage user={user} notify={notify} />;
      case 'gallery':
        return <GalleryPage />;
      case 'news':
        return <NewsPage />;
      case 'faq':
        return <FaqPage />;
      case 'favorites':
        return <FavoritesPage favs={favs} toggleFav={toggleFav} addCart={addCart} onCarClick={setSelCar} />;
      case 'profile':
        return <ProfilePage user={user} setUser={setUser} cart={cart} favs={favs} comments={comments} go={go} />;
      case 'auth':
        return (
          <AuthPage
            mode={authMode}
            setMode={setAuthMode}
            onLogin={(u) => {
              setUser(u);
              ls.set('eu', u);
              go('home');
              notify(`Welcome, ${u.name}! 👋`, 'success');
            }}
          />
        );
      default:
        return (
          <HomePage
            go={go}
            dark={dark}
            onCarClick={setSelCar}
            addCart={addCart}
            toggleFav={toggleFav}
            isFav={isFav}
            notify={notify}
          />
        );
    }
  };

  return (
    <>
      <ToastContainer notes={notes} />

      <Navbar
        page={page}
        user={user}
        dark={dark}
        cartCount={cart.reduce((sum, c) => sum + (c.quantity || 1), 0)}
        go={go}
        toggleTheme={toggleTheme}
        openCart={() => setCartOpen(true)}
        onSignOut={handleSignOut}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        removeCart={removeCart}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        nearestBranch={nearestBranch}
        onCheckout={handleCheckout}
      />

      <main style={{ paddingTop: 60, minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', transition: 'background 0.3s, color 0.3s' }}>
        {renderPage()}
      </main>

      <Footer go={go} />
    </>
  );
}
