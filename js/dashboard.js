async function loadDashboard(){
  // Mengambil data langsung dari database.
  // Nama tahap mengikuti workflow_history.tahap tanpa perubahan.

  const {data: berkas=[]}=await supabase.from('berkas').select('*');

  const total=berkas.length;
  const selesai=berkas.filter(x=>Number(x.progress)>=100).length;
  const persen=total?Math.round((selesai/total)*100):0;

  document.getElementById('total').innerText=total+' Berkas';
  document.getElementById('progress').innerText=persen+'%';


  const {data: workflow=[]}=await supabase
    .from('workflow_history')
    .select('tahap,created_at')
    .order('created_at',{ascending:false});

  const counter={};
  workflow.forEach(x=>{
    counter[x.tahap]=(counter[x.tahap]||0)+1;
  });

  document.getElementById('workflow-list').innerHTML =
    Object.entries(counter).map(([nama,jumlah])=>`
      <div class="workflow-item">
        <div class="dot"></div>
        <div class="workflow-name">
          ${nama}
          <div class="bar"><span style="width:${Math.min(jumlah*10,100)}%"></span></div>
        </div>
        <div class="count">${jumlah}</div>
      </div>
    `).join('');


  document.getElementById('activity-list').innerHTML =
    workflow.slice(0,5).map(x=>`
      <div class="activity-item">
        ${x.tahap}
      </div>
    `).join('');
}

loadDashboard();
