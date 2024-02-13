using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.Data;
using System.Text.Json;

namespace Residencia.Data
{
    public class DL
    {
        string ConnectionString = "Server=(localdb)\\dbapi;Database= APICOVID;Trusted_Connection=True; AttachDbFileName=C:\\Users\\CALIPSO\\APICOVID.mdf;";
        //string ConnectionString = "DATA SOURCE=DESKTOP-L62B8UH\\SQLEXPRESS;INITIAL CATALOG=API_COVID;USER=userApi;PASSWORD=axel123";

        public class ListModel
        {
            //public string id;
            //public string name;

            public string ID_REGISTRO { get; set; }
            public int ORIGEN { get; set; }
            public int SECTOR { get; set; }
            public int ENTIDAD_UM { get; set; }
            public int SEXO { get; set; }
            public int ENTIDAD_NAC { get; set; }
            public int ENTIDAD_RES { get; set; }
            public int MUNICIPIO_RES { get; set; }
            public int TIPO_PACIENTE { get; set; }
            public DateTime FECHA_INGRESO { get; set; }
            public DateTime FECHA_SINTOMAS { get; set; }
            public DateTime FECHA_DEF { get; set; }
            public int INTUBADO { get; set; }
            public int NEUMONIA { get; set; }
            public int EDAD { get; set; }
            public int NACIONALIDAD { get; set; }
            public int EMBARAZO { get; set; }
            public int HABLA_LENGUA_INDIG { get; set; }
            public int INDIGENA { get; set; }
            public int DIABETES { get; set; }
            public int EPOC { get; set; }
            public int ASMA { get; set; }
            public int INMUSUPR { get; set; }
            public int HIPERTENSION { get; set; }
            public int OTRA_COM { get; set; }
            public int CARDIOVASCULAR { get; set; }
            public int OBESIDAD { get; set; }
            public int RENAL_CRONICA { get; set; }
            public int TABAQUISMO { get; set; }
            public int OTRO_CASO { get; set; }
            public int TOMA_MUESTRA_LAB { get; set; }
            public int RESULTADO_LAB { get; set; }
            public int TOMA_MUESTRA_ANTIGENO { get; set; }
            public int RESULTADO_ANTIGENO { get; set; }
            public int CLASIFICACION_FINAL { get; set; }
            public int MIGRANTE { get; set; }
            public string PAIS_NACIONALIDAD { get; set; }
            public string PAIS_ORIGEN { get; set; }
            public int UCI { get; set; }

        }

        public string onGet()
        {
            List<ListModel> list = new List<ListModel>();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                con.Open();
                //string sql = "select top 10 [ID_REGISTRO] as id, [ORIGEN] as name from COVIDMEXICO";
                //string sql = "select top 2 * from COVIDMEXICO";
                //aqui ponle SELECT TOP (1000) FORMAT .... para obtener todo o pon el top (####) para optienes los primeros ####
                string sql = "SELECT TOP (6) FORMAT([FECHA_ACTUALIZACION],'yyyy-MM-dd') as FECHA_ACTUALIZACION\r\n      ,[ID_REGISTRO]\r\n      ,[ORIGEN]\r\n      ,cast([SECTOR] as nvarchar(50)) as SECTOR\r\n      ,cast([ENTIDAD_UM] as nvarchar(50)) as ENTIDAD_UM\r\n      ,[SEXO]\r\n      ,[ENTIDAD_NAC]\r\n      ,cast([ENTIDAD_RES] as nvarchar(50)) as ENTIDAD_RES\r\n      ,[MUNICIPIO_RES]\r\n      ,[TIPO_PACIENTE]\r\n      ,[FECHA_INGRESO]\r\n      ,[FECHA_SINTOMAS]\r\n      ,[FECHA_DEF]\r\n      ,[INTUBADO]\r\n      ,[NEUMONIA]\r\n      ,[EDAD]\r\n      ,[NACIONALIDAD]\r\n      ,[EMBARAZO]\r\n      ,[HABLA_LENGUA_INDIG]\r\n      ,[INDIGENA]\r\n      ,[DIABETES]\r\n      ,[EPOC]\r\n      ,[ASMA]\r\n      ,[INMUSUPR]\r\n      ,[HIPERTENSION]\r\n      ,[OTRA_COM]\r\n      ,[CARDIOVASCULAR]\r\n      ,[OBESIDAD]\r\n      ,[RENAL_CRONICA]\r\n      ,[TABAQUISMO]\r\n      ,[OTRO_CASO]\r\n      ,[TOMA_MUESTRA_LAB]\r\n      ,[RESULTADO_LAB]\r\n      ,[TOMA_MUESTRA_ANTIGENO]\r\n      ,[RESULTADO_ANTIGENO]\r\n      ,[CLASIFICACION_FINAL]\r\n      ,[MIGRANTE]\r\n      ,[PAIS_NACIONALIDAD]\r\n      ,[PAIS_ORIGEN]\r\n      ,cast([UCI] as nvarchar(50)) as UCI\r\n  FROM [APICOVID].[dbo].[COVIDMEXICO]";
                using (SqlCommand cmd = new SqlCommand(sql, con))
                {
                    SqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        ListModel model = new ListModel();
                        //model.id = dr.GetString("id");
                        //model.name = dr.GetString("name");

                        model.ID_REGISTRO = dr.GetString("ID_REGISTRO");
                        model.ORIGEN = Convert.ToInt32(dr.GetString("ORIGEN"));
                        model.SECTOR = Convert.ToInt32(dr.GetString("SECTOR"));
                        //model.SECTOR = dr.GetString("SECTOR");
                        model.ENTIDAD_UM = Convert.ToInt32(dr.GetString("ENTIDAD_UM"));
                        model.SEXO = Convert.ToInt32(dr.GetString("SEXO"));
                        model.ENTIDAD_NAC = Convert.ToInt32(dr.GetString("ENTIDAD_NAC"));
                        model.ENTIDAD_RES = Convert.ToInt32(dr.GetString("ENTIDAD_RES"));
                        model.MUNICIPIO_RES = Convert.ToInt32(dr.GetString("MUNICIPIO_RES"));
                        model.TIPO_PACIENTE = Convert.ToInt32(dr.GetString("TIPO_PACIENTE"));
                        //model.FECHA_INGRESO = Convert.ToDateTime(dr.GetString("FECHA_INGRESO"));
                        //
                        //
                        model.INTUBADO = Convert.ToInt32(dr.GetString("INTUBADO"));
                        model.NEUMONIA = Convert.ToInt32(dr.GetString("NEUMONIA"));
                        model.EDAD = Convert.ToInt32(dr.GetString("EDAD"));
                        model.NACIONALIDAD = Convert.ToInt32(dr.GetString("NACIONALIDAD"));
                        model.EMBARAZO = Convert.ToInt32(dr.GetString("EMBARAZO"));
                        model.HABLA_LENGUA_INDIG = Convert.ToInt32(dr.GetString("HABLA_LENGUA_INDIG"));
                        model.INDIGENA = Convert.ToInt32(dr.GetString("INDIGENA"));
                        model.DIABETES = Convert.ToInt32(dr.GetString("DIABETES"));
                        model.EPOC = Convert.ToInt32(dr.GetString("EPOC"));
                        model.ASMA = Convert.ToInt32(dr.GetString("ASMA"));
                        model.INMUSUPR = Convert.ToInt32(dr.GetString("INMUSUPR"));
                        model.HIPERTENSION = Convert.ToInt32(dr.GetString("HIPERTENSION"));
                        model.OTRA_COM = Convert.ToInt32(dr.GetString("OTRA_COM"));
                        model.CARDIOVASCULAR = Convert.ToInt32(dr.GetString("CARDIOVASCULAR"));
                        model.OBESIDAD = Convert.ToInt32(dr.GetString("OBESIDAD"));
                        model.RENAL_CRONICA = Convert.ToInt32(dr.GetString("RENAL_CRONICA"));
                        model.TABAQUISMO = Convert.ToInt32(dr.GetString("TABAQUISMO"));
                        model.OTRO_CASO = Convert.ToInt32(dr.GetString("OTRO_CASO"));
                        model.TOMA_MUESTRA_LAB = Convert.ToInt32(dr.GetString("TOMA_MUESTRA_LAB"));
                        model.RESULTADO_LAB = Convert.ToInt32(dr.GetString("RESULTADO_LAB"));
                        model.TOMA_MUESTRA_ANTIGENO = Convert.ToInt32(dr.GetString("TOMA_MUESTRA_ANTIGENO"));
                        model.RESULTADO_ANTIGENO = Convert.ToInt32(dr.GetString("RESULTADO_ANTIGENO"));
                        model.CLASIFICACION_FINAL = Convert.ToInt32(dr.GetString("CLASIFICACION_FINAL"));
                        model.MIGRANTE = Convert.ToInt32(dr.GetString("MIGRANTE"));
                        model.PAIS_NACIONALIDAD = dr.GetString("PAIS_NACIONALIDAD");
                        model.PAIS_ORIGEN = dr.GetString("PAIS_ORIGEN");
                        model.UCI = Convert.ToInt32(dr.GetString("UCI"));



                        list.Add(model);
                    }
                }

                con.Close();
            }

            var json = JsonSerializer.Serialize(list);
            return json;

        }



        public string GetInfectados()
        {
            DataTable dataTable = new DataTable();

            List<ListModel> list = new List<ListModel>();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                con.Open();
                //string sql = "select top 10 [ID_REGISTRO] as id, [ORIGEN] as name from COVIDMEXICO";
                //string sql = "select top 2 * from COVIDMEXICO";
                //aqui ponle SELECT TOP (1000) FORMAT .... para obtener todo o pon el top (####) para optienes los primeros ####
                string sql = "exec [dbo].[Infectados]";
                using (SqlCommand cmd = new SqlCommand(sql, con))
                {
                    SqlDataReader dr = cmd.ExecuteReader();
                    
                    

                    dataTable.Load(dr);

                }

                con.Close();
            }

            var json = ConvertDataTabletoJsonString(dataTable);
            return json;

        }

        public string GetSexo()
        {
            DataTable dataTable = new DataTable();

            List<ListModel> list = new List<ListModel>();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                con.Open();
                //string sql = "select top 10 [ID_REGISTRO] as id, [ORIGEN] as name from COVIDMEXICO";
                //string sql = "select top 2 * from COVIDMEXICO";
                //aqui ponle SELECT TOP (1000) FORMAT .... para obtener todo o pon el top (####) para optienes los primeros ####
                string sql = "exec [dbo].[Generos_Infectados]";
                using (SqlCommand cmd = new SqlCommand(sql, con))
                {
                    SqlDataReader dr = cmd.ExecuteReader();

                    dataTable.Load(dr);

                }

                con.Close();
            }

            var json = ConvertDataTabletoJsonString(dataTable);
            return json;

        }



        public string GetEdad()
        {
            DataTable dataTable = new DataTable();

            List<ListModel> list = new List<ListModel>();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                con.Open();
                //string sql = "select top 10 [ID_REGISTRO] as id, [ORIGEN] as name from COVIDMEXICO";
                //string sql = "select top 2 * from COVIDMEXICO";
                //aqui ponle SELECT TOP (1000) FORMAT .... para obtener todo o pon el top (####) para optienes los primeros ####
                string sql = "exec [dbo].[Edades_Infectados]";
                using (SqlCommand cmd = new SqlCommand(sql, con))
                {
                    SqlDataReader dr = cmd.ExecuteReader();

                    dataTable.Load(dr);

                }

                con.Close();
            }

            var json = ConvertDataTabletoJsonString(dataTable);
            return json;

        }


        public string GetFallecidos()
        {
            DataTable dataTable = new DataTable();

            List<ListModel> list = new List<ListModel>();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                con.Open();
                //string sql = "select top 10 [ID_REGISTRO] as id, [ORIGEN] as name from COVIDMEXICO";
                //string sql = "select top 2 * from COVIDMEXICO";
                //aqui ponle SELECT TOP (1000) FORMAT .... para obtener todo o pon el top (####) para optienes los primeros ####
                string sql = "exec [dbo].[Muertos_Infectados]";
                using (SqlCommand cmd = new SqlCommand(sql, con))
                {
                    SqlDataReader dr = cmd.ExecuteReader();

                    dataTable.Load(dr);

                }

                con.Close();
            }

            var json = ConvertDataTabletoJsonString(dataTable);
            return json;

        }


        public string GetEstados()
        {
            DataTable dataTable = new DataTable();

            List<ListModel> list = new List<ListModel>();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                con.Open();
                //string sql = "select top 10 [ID_REGISTRO] as id, [ORIGEN] as name from COVIDMEXICO";
                //string sql = "select top 2 * from COVIDMEXICO";
                //aqui ponle SELECT TOP (1000) FORMAT .... para obtener todo o pon el top (####) para optienes los primeros ####
                string sql = "exec [dbo].[Estados_Infectados]";
                using (SqlCommand cmd = new SqlCommand(sql, con))
                {
                    SqlDataReader dr = cmd.ExecuteReader();

                    dataTable.Load(dr);

                }

                con.Close();
            }

            var json = ConvertDataTabletoJsonString(dataTable);
            return json;

        }

        public string GetOEnfer()
        {
            DataTable dataTable = new DataTable();

            List<ListModel> list = new List<ListModel>();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                con.Open();
                //string sql = "select top 10 [ID_REGISTRO] as id, [ORIGEN] as name from COVIDMEXICO";
                //string sql = "select top 2 * from COVIDMEXICO";
                //aqui ponle SELECT TOP (1000) FORMAT .... para obtener todo o pon el top (####) para optienes los primeros ####
                string sql = "exec [dbo].[Enfermos_Infectados]";
                using (SqlCommand cmd = new SqlCommand(sql, con))
                {
                    SqlDataReader dr = cmd.ExecuteReader();

                    dataTable.Load(dr);

                }

                con.Close();
            }

            var json = ConvertDataTabletoJsonString(dataTable);
            return json;

        }

        public string GetEmbarazadas()
        {
            DataTable dataTable = new DataTable();

            List<ListModel> list = new List<ListModel>();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                con.Open();
                //string sql = "select top 10 [ID_REGISTRO] as id, [ORIGEN] as name from COVIDMEXICO";
                //string sql = "select top 2 * from COVIDMEXICO";
                //aqui ponle SELECT TOP (1000) FORMAT .... para obtener todo o pon el top (####) para optienes los primeros ####
                string sql = "exec [dbo].[Enbarazadas_Infectados]";
                using (SqlCommand cmd = new SqlCommand(sql, con))
                {
                    SqlDataReader dr = cmd.ExecuteReader();

                    dataTable.Load(dr);

                }

                con.Close();
            }

            var json = ConvertDataTabletoJsonString(dataTable);
            return json;

        }

        public string GetIntubados()
        {
            DataTable dataTable = new DataTable();

            List<ListModel> list = new List<ListModel>();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                con.Open();
                //string sql = "select top 10 [ID_REGISTRO] as id, [ORIGEN] as name from COVIDMEXICO";
                //string sql = "select top 2 * from COVIDMEXICO";
                //aqui ponle SELECT TOP (1000) FORMAT .... para obtener todo o pon el top (####) para optienes los primeros ####
                string sql = "exec [dbo].[Intubados_Infectados]";
                using (SqlCommand cmd = new SqlCommand(sql, con))
                {
                    SqlDataReader dr = cmd.ExecuteReader();

                    dataTable.Load(dr);

                }

                con.Close();
            }

            var json = ConvertDataTabletoJsonString(dataTable);
            return json;

        }

        public string GetInstitucion()
        {
            DataTable dataTable = new DataTable();

            List<ListModel> list = new List<ListModel>();
            using (SqlConnection con = new SqlConnection(ConnectionString))
            {
                con.Open();
                //string sql = "select top 10 [ID_REGISTRO] as id, [ORIGEN] as name from COVIDMEXICO";
                //string sql = "select top 2 * from COVIDMEXICO";
                //aqui ponle SELECT TOP (1000) FORMAT .... para obtener todo o pon el top (####) para optienes los primeros ####
                string sql = "exec [dbo].[Institucion_Infectados]";
                using (SqlCommand cmd = new SqlCommand(sql, con))
                {
                    SqlDataReader dr = cmd.ExecuteReader();

                    dataTable.Load(dr);

                }

                con.Close();
            }

            var json = ConvertDataTabletoJsonString(dataTable);
            return json;

        }




        public string ConvertDataTabletoJsonString(DataTable dt)
        {

            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            //revisar aqui
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow dr in dt.Rows)
                {
                    row = new Dictionary<string, object>();
                    foreach (DataColumn col in dt.Columns)
                    {
                        row.Add(col.ColumnName, dr[col]);
                    }
                    rows.Add(row);
                }
            }
            else
            {

                DataRow drn = dt.NewRow();

                dt.Rows.Add(drn);

                foreach (DataRow dr in dt.Rows)
                {
                    row = new Dictionary<string, object>();
                    foreach (DataColumn col in dt.Columns)
                    {
                        row.Add(col.ColumnName, dr[col]);
                    }
                    rows.Add(row);
                }
            }

            var json = JsonSerializer.Serialize(rows);
            return json;
        }



    }

    //public string ConvertDataTabletoJsonString(DataTable dt)
    //    {
            
    //        List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
    //        Dictionary<string, object> row;
    //        //revisar aqui
    //        if (dt.Rows.Count > 0)
    //        {
    //            foreach (DataRow dr in dt.Rows)
    //            {
    //                row = new Dictionary<string, object>();
    //                foreach (DataColumn col in dt.Columns)
    //                {
    //                    row.Add(col.ColumnName, dr[col]);
    //                }
    //                rows.Add(row);
    //            }
    //        }
    //        else
    //        {

    //            DataRow drn = dt.NewRow();

    //            dt.Rows.Add(drn);

    //            foreach (DataRow dr in dt.Rows)
    //            {
    //                row = new Dictionary<string, object>();
    //                foreach (DataColumn col in dt.Columns)
    //                {
    //                    row.Add(col.ColumnName, dr[col]);
    //                }
    //                rows.Add(row);
    //            }
    //        }

    //        var json = JsonSerializer.Serialize(rows);
    //        return json;
    //    }



    //}
}
