IF I add, delete, update any field, than must update in...

//Frontend side
1. InputForm page
   const res = await axios.get("http://localhost:5000/api/form-dataC"); lower case

2. Product list page (SBU page)

3. UserReport

//Backend side
4. server
   app.use("/api/form-dataC", require("./routes/formDataC")); must match axios.get

5. model form SBU wise

6. routes form SBU wise

finnaly find if any previous text exits...




git add .
git commit -m "Something Updated"
git push origin main

git push origin main --force
git push origin main --force-with-lease

When to use which
--force ❌ can delete others’ commits
--force-with-lease ✅ safer, prevents accidental overwrites