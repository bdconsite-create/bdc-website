"use client";

import {
  Anchor, ArrowDown, ArrowRight, Building2, ChevronRight, Compass,
  Mail, MapPin, Menu, Phone, Ruler, Ship, Waves, Wrench, X,
} from "lucide-react";
import { useEffect, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const services = [
  { icon: Waves, number: "01", en: "Dredging Service", th: "งานขุดลอก", detail: "ร่องน้ำเดินเรือ หน้าท่าเทียบเรือ แอ่งจอดเรือ แม่น้ำ คลองระบายน้ำ และคลองชลประทาน", image: asset("/images/project-channel.webp") },
  { icon: Building2, number: "02", en: "Marine Construction", th: "งานก่อสร้างทางน้ำ", detail: "ออกแบบและก่อสร้างท่าเทียบเรือ เขื่อน ประตูระบายน้ำ และสิ่งปลูกสร้างทางน้ำ", image: asset("/images/project-operation.webp") },
  { icon: Compass, number: "03", en: "Topographic Survey", th: "งานสำรวจภูมิประเทศ", detail: "สำรวจรายละเอียดพื้นที่ กำหนดพิกัด ระดับความสูง และจัดทำแผนที่แนวชายฝั่ง", image: asset("/images/service-survey.webp") },
  { icon: Ruler, number: "04", en: "Bathymetric Survey", th: "งานสำรวจพื้นท้องน้ำ", detail: "สำรวจความลึกในแม่น้ำและทะเล ก่อนและหลังการขุดลอกด้วยเครื่องมือความแม่นยำสูง", image: asset("/images/service-bathymetry.webp") },
  { icon: Wrench, number: "05", en: "Shipbuilding & Installation", th: "งานต่อเรือและติดตั้ง", detail: "ต่อสร้างเรือเหล็ก โป๊ะเทียบเรือ ทุ่นเครื่องหมายเดินเรือ และหลักไฟนำร่อง", image: asset("/images/fleet-bdc1.webp") },
  { icon: Anchor, number: "06", en: "Marine Salvage", th: "งานกู้ภัยทางทะเล", detail: "งานกู้ภัยและกู้เรือทั้งในแม่น้ำ ชายฝั่ง และพื้นที่ปฏิบัติงานทางทะเล", image: asset("/images/project-grab.webp") },
];

const projects = [
  { title: "ร่องน้ำสมุทรสาคร (ท่าจีน)", type: "Maintenance Dredging", client: "กรมเจ้าท่า กระทรวงคมนาคม", location: "สมุทรสาคร", year: "2568", image: asset("/images/project-channel.webp") },
  { title: "ร่องน้ำบางปะกง", type: "Coastal Channel Dredging", client: "กรมเจ้าท่า กระทรวงคมนาคม", location: "ฉะเชิงเทรา", year: "2568", image: asset("/images/project-grab.webp") },
  { title: "Sand Bypassing ร่องน้ำบางมะรวด", type: "Sand Bypassing", client: "กรมเจ้าท่า กระทรวงคมนาคม", location: "ปัตตานี", year: "2565", image: asset("/images/project-operation.webp") },
];

const fleetTypes = [
  "Trailing Suction Hopper Dredger", "Cutter Suction Dredger",
  "Grab & Backhoe Dredger", "Split Hopper Barge", "Tug & Tender Boat",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const heroVideo = document.querySelector<HTMLVideoElement>(".hero-video");
    const updateVideoMotion = () => {
      if (!heroVideo) return;
      if (motionPreference.matches) heroVideo.pause();
      else heroVideo.play().catch(() => undefined);
    };
    onScroll();
    updateVideoMotion();
    window.addEventListener("scroll", onScroll, { passive: true });
    motionPreference.addEventListener("change", updateVideoMotion);

    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));

    return () => {
      window.removeEventListener("scroll", onScroll);
      motionPreference.removeEventListener("change", updateVideoMotion);
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  return (
    <main>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="Bangkok Dredging home">
          <img src={asset("/images/bdc-logo.png")} alt="BDC Bangkok Dredging" />
          <span className="brand-copy"><strong>บริษัท บางกอก เดรดจิ้ง จำกัด</strong><small>BANGKOK DREDGING CO., LTD.</small></span>
        </a>
        <nav className="desktop-nav" aria-label="เมนูหลัก">
          <a href="#about">เกี่ยวกับเรา</a><a href="#services">บริการ</a><a href="#projects">ผลงาน</a><a href="#fleet">กองเรือ</a><a href="#quality">มาตรฐาน</a>
        </nav>
        <a className="header-cta" href="#contact">ติดต่อเรา <ArrowRight size={16} /></a>
        <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "ปิดเมนู" : "เปิดเมนู"} aria-expanded={menuOpen}>
          {menuOpen ? <X /> : <Menu />}
        </button>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="เมนูมือถือ">
            <a href="#about" onClick={closeMenu}>เกี่ยวกับเรา</a><a href="#services" onClick={closeMenu}>บริการ</a><a href="#projects" onClick={closeMenu}>ผลงาน</a><a href="#fleet" onClick={closeMenu}>กองเรือ</a><a href="#quality" onClick={closeMenu}>มาตรฐาน</a><a href="#contact" onClick={closeMenu}>ติดต่อเรา</a>
          </nav>
        )}
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow light">DREDGING & MARINE CONTRACTOR · EST. 1991</p>
          <h1><span className="hero-title-main">บริการครบวงจร</span><span className="hero-title-accent">ด้านงานโยธาทางน้ำ</span></h1>
          <p className="hero-lead">ครบทั้งประสบการณ์ ความเชี่ยวชาญ พร้อมกองเรือ ในทุกภารกิจ</p>
          <div className="hero-actions">
            <a className="button button-blue" href="#projects">ดูผลงานของเรา <ArrowRight size={18} /></a>
            <a className="text-link light-link" href="#fleet">สำรวจกองเรือ <ChevronRight size={18} /></a>
          </div>
          <a className="scroll-cue" href="#proof" aria-label="เลื่อนลงเพื่อดูข้อมูลบริษัท"><ArrowDown size={18} /><span>DISCOVER BDC</span></a>
        </div>
        <div className="hero-visual">
          <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster={asset("/images/hero-dredging.webp")} aria-label="กองเรือ Bangkok Dredging ปฏิบัติงานในทะเล">
            <source src={asset("/video/hero-bdc.mp4")} type="video/mp4" />
          </video>
          <div className="hero-visual-shade" />
          <div className="hero-badge"><Waves size={24} /><span>ENGINEERING WATERWAYS</span></div>
        </div>
      </section>

      <section className="proof-strip" id="proof" aria-label="ข้อมูลสำคัญของบริษัท" data-reveal>
        <div className="proof-intro"><small>Business-Driving Potential</small><strong>ศักยภาพที่ขับเคลื่อนธุรกิจ</strong></div>
        <div className="proof-item"><strong>1991</strong><span>ปีที่ก่อตั้ง</span></div>
        <div className="proof-item"><strong>230M</strong><span>ทุนจดทะเบียน (บาท)</span></div>
        <div className="proof-item"><strong>150+</strong><span>บุคลากรและผู้เชี่ยวชาญ</span></div>
        <div className="proof-item"><strong>28+</strong><span>เรือขุดและเรือสนับสนุน</span></div>
      </section>

      <section className="about section-shell" id="about" data-reveal>
        <SectionLabel number="01" text="ABOUT BDC" />
        <div className="about-heading">
          <p className="eyebrow">เส้นทางแห่งการเติบโตและพัฒนา</p>
          <h2 className="line-heading about-title">
            <span>จากงานต่อเรือขนาดเล็ก</span>
            <span>สู่ผู้เชี่ยวชาญ</span>
            <span>ด้านงานโยธาทางน้ำครบวงจร</span>
          </h2>
        </div>
        <div className="about-copy">
          <p>บริษัท บางกอก เดรดจิ้ง จำกัด ก่อตั้งโดยคนไทยในปี พ.ศ. 2534 เริ่มต้นจากการต่อเรือขนาดเล็กไว้จำหน่าย ก่อนพัฒนาสู่ธุรกิจงานขุดลอกร่องน้ำทางเดินเรือและงานทางน้ำ ด้วยการลงทุนในกองเรือ เครื่องจักร และบุคลากรอย่างต่อเนื่อง</p>
          <p>ปัจจุบันบริษัทให้บริการตั้งแต่งานขุดลอก งานก่อสร้างทางน้ำ งานสำรวจ งานต่อเรือและติดตั้ง ไปจนถึงงานกู้ภัยทางทะเล</p>
          <a className="text-link" href="#services">ดูขอบเขตการให้บริการ <ChevronRight size={18} /></a>
        </div>
        <div className="timeline-rail" aria-label="ประวัติบริษัทโดยย่อ">
          <div><strong>1991</strong><span>ก่อตั้งบริษัท</span></div><div><strong>2002</strong><span>เข้าสู่งานทางน้ำ</span></div><div><strong>2010</strong><span>Bangkok Dredging</span></div><div className="current"><strong>TODAY</strong><span>บริการครบวงจร</span></div>
        </div>
      </section>

      <section className="services section-shell" id="services" data-reveal>
        <SectionLabel number="02" text="OUR SERVICES" />
        <div className="section-heading-row">
          <div><p className="eyebrow">ONE PARTNER · COMPLETE CAPABILITY</p><h2 className="line-heading service-title"><span>บริการครบวงจร</span><span>ด้านงานโยธาทางน้ำ</span></h2></div>
          <p>ผสานประสบการณ์ภาคสนาม บุคลากรเฉพาะทาง และเครื่องจักรที่เหมาะสม เพื่อสนับสนุนโครงการตั้งแต่การสำรวจจนถึงการปฏิบัติงานจริง</p>
        </div>
        <div className="service-grid">
          {services.map((service) => { const Icon = service.icon; return (
            <article className="service-card" key={service.number} data-reveal>
              <img src={service.image} alt={service.th} className="service-image" loading="lazy" />
              <div className="service-shade" />
              <div className="service-content">
                <div className="service-topline"><Icon size={28} strokeWidth={1.7} /><span>{service.number}</span></div>
                <div><p className="service-en">{service.en}</p><h3>{service.th}</h3><p>{service.detail}</p></div>
                <span className="service-link">รายละเอียด <ChevronRight className="service-arrow" size={20} /></span>
              </div>
            </article>
          ); })}
        </div>
      </section>

      <section className="projects section-shell" id="projects" data-reveal>
        <SectionLabel number="03" text="SELECTED PROJECTS" />
        <div className="section-heading-row projects-heading">
          <div><p className="eyebrow">TRACK RECORD ACROSS THAILAND</p><h2 className="line-heading project-title"><span>ผลงานที่ได้รับความไว้วางใจ</span><span>จากหน่วยงานราชการและเอกชน</span></h2></div>
          <p>ตัวอย่างโครงการขุดลอกและบำรุงรักษาร่องน้ำที่ได้รับความไว้วางใจ จากหน่วยงานภาครัฐและองค์กรชั้นนำ</p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className="project-card" key={project.title} data-reveal>
              <div className="project-image"><img src={project.image} alt={`ภาพโครงการ${project.title}`} className="cover-image" loading="lazy" /><span className="project-index">0{index + 1}</span></div>
              <div className="project-body"><p className="project-type">{project.type}</p><h3>{project.title}</h3><div className="project-meta"><span><MapPin size={15} /> {project.location}</span><span>{project.year}</span></div><p className="project-client">{project.client}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="fleet" id="fleet" data-reveal>
        <div className="fleet-image">
          <img src={asset("/images/fleet-bdc1.webp")} alt="เรือขุดแบบยุ้งดิน BDC 1" className="cover-image" loading="lazy" />
          <div className="fleet-caption"><span>FEATURED VESSEL</span><strong>BDC 1</strong><small>TRAILING SUCTION HOPPER DREDGER</small></div>
        </div>
        <div className="fleet-copy">
          <SectionLabel number="04" text="FLEET & EQUIPMENT" dark />
          <p className="eyebrow orange-text">CAPABILITY ON THE WATER</p><h2 className="line-heading fleet-title"><span>กองเรือและเครื่องจักรครบวงจร</span><span>พร้อมขับเคลื่อนความสำเร็จในทุกโครงการ</span></h2>
          <p className="fleet-intro">เรือขุดหลายประเภท เรือสนับสนุน และเครื่องจักรหนัก ช่วยให้บริษัทเลือกวิธีปฏิบัติงานให้เหมาะกับพื้นที่ วัสดุท้องน้ำ และข้อกำหนดของแต่ละโครงการ</p>
          <div className="fleet-list">{fleetTypes.map((type, index) => <div key={type}><span>0{index + 1}</span><strong>{type}</strong><ArrowRight size={17} /></div>)}</div>
          <div className="fleet-fact"><Ship size={28} /><div><strong>28+</strong><span>เรือขุดและเรือสนับสนุนตามรายการใน Company Profile</span></div></div>
        </div>
      </section>

      <section className="quality section-shell" id="quality" data-reveal>
        <SectionLabel number="05" text="QUALITY & RESPONSIBILITY" />
        <div className="quality-content">
          <div><p className="eyebrow">QUALITY IN EVERY OPERATION</p><h2 className="line-heading quality-title"><span>บริการด้วยคุณภาพ</span><span>ด้วยเทคโนโลยีที่ทันสมัย</span><span>และความรับผิดชอบต่อสิ่งแวดล้อม</span></h2><p>การดำเนินงานทุกโครงการให้ความสำคัญกับมาตรฐานการบริหารคุณภาพ ความพร้อมของบุคลากรและเครื่องจักร รวมถึงผลกระทบต่อพื้นที่ทางน้ำและชุมชน</p></div>
          <div className="iso-panel">
            <img src={asset("/images/iso-9001-bureau-veritas.png")} alt="เครื่องหมายรับรองระบบบริหารคุณภาพ ISO 9001 โดย Bureau Veritas" loading="lazy" />
            <div><strong>ISO 9001</strong><span>ระบบบริหารคุณภาพที่ได้รับการรับรอง</span></div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact" data-reveal>
        <div className="contact-watermark">BDC</div>
        <div><p className="eyebrow light">LET&apos;S BUILD ON WATER</p><h2 className="line-heading contact-title"><span>พร้อมสนับสนุนความสำเร็จ</span><span>และโอกาสทางธุรกิจอย่างยั่งยืน</span></h2></div>
        <div className="contact-actions"><a href="tel:+6623975860"><Phone size={19} /> 0-2397-5860-1</a><a href="mailto:bkkdredging1991@yahoo.com"><Mail size={19} /> ส่งอีเมลถึงบริษัท</a></div>
      </section>

      <footer>
        <div className="footer-brand"><img src={asset("/images/bdc-logo.png")} alt="BDC" /><div><strong>บริษัท บางกอก เดรดจิ้ง จำกัด</strong><span>BANGKOK DREDGING CO., LTD.</span></div></div>
        <div className="footer-address"><MapPin size={20} /><p>เลขที่ 12/35 ม.15 ซ.บางนาตราด39 (ศรหิรัญ) ถ.บางนา-ตราด กม.5, ตำบลบางแก้ว อำเภอบางพลี จังหวัดสมุทรปราการ 10540</p></div>
        <div className="footer-note"><span>DREDGING AND MARINE CONTRACTOR</span><span>© 2026 BANGKOK DREDGING</span></div>
      </footer>
    </main>
  );
}

function SectionLabel({ number, text, dark = false }: { number: string; text: string; dark?: boolean }) {
  return <div className={`section-label${dark ? " on-dark" : ""}`}><span>{number}</span><p>{text}</p></div>;
}
