function  env_dereference( value, data ) {
  var     ret = null,
          ope = "${",
          l_ope = ope.length,
          end = "}",
          l_end = end.length;

  while ((t_pos = value.indexOf(ope)) != -1) {
    var s_b = value.substr(t_pos),
        i_e = s_b.indexOf(end) - l_ope,
        s_c = s_b.substr(l_ope, i_e),
        r = data[s_c];

    if (r) {
      var t_split = value.split("");

      t_split.splice(t_pos, t_pos + i_e + l_ope + l_end, r);
      ret = t_split.join("");
    }
    else
      throw ("Var unknown reference at "+ t_pos +" (\""+ s_b +"\")");
  }

  return (ret);
}
