// Browser recreations of the notebook exercises; the original Python stays intact.
(() => {
  function numbers(text) {
    const raw = text.trim().split(/[\s,]+/).filter(Boolean);
    if (!raw.length || raw.length > 500) throw Error('Enter between 1 and 500 numbers.');
    const values = raw.map(Number);
    if (values.some(value => !Number.isFinite(value))) throw Error('Use numbers separated by commas or spaces.');
    return values;
  }
  function matrix(text) {
    const rows = text.trim().split(/\n/).filter(row => row.trim()).map(numbers);
    if (rows.length !== 3 || rows.some(row => row.length !== 3)) throw Error('Each matrix needs exactly 3 rows with 3 numbers per row.');
    return rows;
  }
  function calculate(id, values) {
    if (id === 1) {
      const temps = numbers(values.temperatures), limit = Number(values.threshold);
      if (!Number.isFinite(limit)) throw Error('Enter a valid temperature threshold.');
      return `Days above ${limit}°C: ${temps.filter(t => t > limit).length}\nHighest: ${Math.max(...temps)}°C\nLowest: ${Math.min(...temps)}°C\nDays analyzed: ${temps.length}`;
    }
    if (id === 2) {
      const scores = numbers(values.scores), limit = Number(values.passmark);
      if (!Number.isFinite(limit) || limit < 0 || limit > 100 || scores.some(s => s < 0 || s > 100)) throw Error('Scores and the pass mark must be between 0 and 100.');
      return `Average: ${(scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2)}\nPassed: ${scores.filter(s => s >= limit).length}\nFailed: ${scores.filter(s => s < limit).length}\n\n` + scores.map((s, i) => `Student ${i + 1}: ${s} — ${s >= limit ? 'Pass' : 'Fail'}`).join('\n');
    }
    if (id === 3) {
      const items = JSON.parse(values.inventory);
      if (!Array.isArray(items) || !items.length || items.length > 100 || items.some(item => !item || typeof item.item !== 'string' || !item.item.trim() || !Number.isInteger(item.quantity) || item.quantity < 0 || typeof item.price !== 'number' || !Number.isFinite(item.price) || item.price < 0)) throw Error('Use a JSON list of items with a name, nonnegative integer quantity, and nonnegative price.');
      const restock = items.filter(i => i.quantity <= 20).map(i => i.item);
      const total = items.reduce((sum, i) => sum + i.quantity * i.price, 0);
      return `Restock (quantity ≤ 20): ${restock.join(', ') || 'None'}\nInventory value before price updates: $${total.toFixed(2)}\n\n10% price increase for quantity ≤ 15:\n` + (items.filter(i => i.quantity <= 15).map(i => `${i.item}: $${(i.price * 1.1).toFixed(2)}`).join('\n') || 'No items qualify.');
    }
    if (id === 4) {
      const combined = [...numbers(values.first), ...numbers(values.second)].sort((a, b) => b - a);
      const index = combined.indexOf(5);
      if (index >= 0) combined.splice(index, 1);
      return `Combined, sorted descending, with the first 5 removed:\n[${combined.join(', ')}]` + (index < 0 ? '\nThere was no 5 to remove.' : '');
    }
    if (id === 5) {
      const words = values.words.trim().split(/[\s,]+/).filter(Boolean);
      if (!words.length || words.length > 500) throw Error('Enter between 1 and 500 words.');
      const longest = words.reduce((a, b) => [...a].length >= [...b].length ? a : b);
      return `Word lengths: [${words.map(w => [...w].length).join(', ')}]\nLongest word: ${longest}\nWords starting with “${values.prefix}”: ${words.filter(w => w.startsWith(values.prefix)).join(', ') || 'None'}`;
    }
    if (id === 6) {
      const a = matrix(values.matrixa), b = matrix(values.matrixb);
      return 'A + B =\n' + a.map((row, i) => '[ ' + row.map((v, j) => v + b[i][j]).join('  ') + ' ]').join('\n');
    }
    return '';
  }
  const inventory = JSON.stringify([{item:'Apple',quantity:50,price:.5},{item:'Banana',quantity:20,price:.3},{item:'Orange',quantity:30,price:.7},{item:'Grapes',quantity:15,price:1.5},{item:'Mango',quantity:10,price:2}], null, 2);
  const configs = [
    { title: 'Find the hot days', fields: [{name:'temperatures',label:'Temperatures (°C)',value:'18, 22, 19, 25, 17, 21, 23, 20, 26, 24, 19, 22, 27, 21, 23, 18, 24, 25, 19, 20, 22, 26, 23, 21, 19, 24, 22, 20, 18, 23',area:true},{name:'threshold',label:'Count days above',value:'24',type:'number'}]},
    { title:'Process your scores',fields:[{name:'scores',label:'Scores, from 0 to 100',value:'88, 76, 90, 85, 92, 67, 73, 81, 95, 78',area:true},{name:'passmark',label:'Pass mark',value:'70',type:'number',min:0,max:100}]},
    { title:'Manage the inventory',fields:[{name:'inventory',label:'Edit quantities, prices, or add an item (JSON)',value:inventory,area:true,rows:10}]},
    { title:'Combine and sort',fields:[{name:'first',label:'First list',value:'1, 3, 5, 7, 9'},{name:'second',label:'Second list',value:'2, 4, 6, 8, 10'}]},
    { title:'Explore your words',fields:[{name:'words',label:'Words, separated by commas or spaces',value:'python, data, science, machine, learning, artificial, intelligence',area:true},{name:'prefix',label:'Find words starting with (case-sensitive)',value:'a'}]},
    { title:'Add two matrices',fields:[{name:'matrixa',label:'Matrix A — three rows',value:'1, 2, 3\n4, 5, 6\n7, 8, 9',area:true},{name:'matrixb',label:'Matrix B — three rows',value:'9, 8, 7\n6, 5, 4\n3, 2, 1',area:true}]}
  ];
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  configs.forEach((config, index) => {
    const id = index + 1, section = document.querySelector(`#exercise-${id}`);
    if (!section) return;
    const form = document.createElement('form');
    form.className = 'playground';
    form.innerHTML = `<p class="lab-label">TRY IT YOURSELF</p><h3>${config.title}</h3><div class="lab-fields">` + config.fields.map(field => {
      const inputId = `lab-${id}-${field.name}`;
      return `<label for="${inputId}">${field.label}${field.area ? `<textarea id="${inputId}" name="${field.name}" rows="${field.rows || 3}" required>${escape(field.value)}</textarea>` : `<input id="${inputId}" name="${field.name}" type="${field.type || 'text'}" value="${escape(field.value)}" ${field.type === 'number' ? 'step="any"' : ''} ${field.min !== undefined ? `min="${field.min}" max="${field.max}"` : ''} ${field.name !== 'prefix' ? 'required' : ''}>`}</label>`;
    }).join('') + '</div><div class="lab-actions"><button type="submit">Run example ↗</button><button type="reset" class="secondary">Reset inputs</button></div><p class="lab-result-label">Your result</p><pre class="lab-result" role="status" aria-live="polite" aria-atomic="true"></pre>';
    const output = form.querySelector('.lab-result');
    function run() {
      try {
        output.textContent = calculate(id, Object.fromEntries(new FormData(form)));
        output.classList.remove('is-error');
      } catch (error) {
        output.textContent = error instanceof SyntaxError ? 'Check the inventory JSON: use double quotes around names and commas between items.' : error.message;
        output.classList.add('is-error');
      }
    }
    form.addEventListener('submit', event => { event.preventDefault(); run(); });
    form.addEventListener('reset', () => { setTimeout(run, 0); });
    section.insertBefore(form, section.querySelector('details'));
    run();
  });
})();
