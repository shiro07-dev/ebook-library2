function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="row text-center">
          <div className="col">
            <h2>Kontak Kami</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nama Lengkap
                </label>
                <input type="text" className="form-control" id="name" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input type="email" className="form-control" id="email" />
              </div>
              <div className="mb-3">
                <label htmlFor="pesan" className="form-label">
                  Pesan
                </label>
                <textarea
                  className="form-control"
                  id="pesan"
                  rows="3"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary mb-3">
                Kirim
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
