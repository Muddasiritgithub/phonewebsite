import React from "react";
import HeaderAppBar from "../../../../src/app/Components/Common/HeaderAppBar";  
import Footer from "../../../../src/app/Components/Common/Footer/index";  

const layout = ({ children }) => {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <HeaderAppBar />

      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
    </section>
  );
};
export default layout;
