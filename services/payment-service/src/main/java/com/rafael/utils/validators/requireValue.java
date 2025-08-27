package com.rafael.utils.validators;

public class requireValue {
    public static <T> T requireNotNull(T v, String f) {
        if (v == null) throw new IllegalArgumentException(f + " null");
        return v;
    }

    public static String requireNotBlank(String v, String f) {
        if (v == null || v.isBlank()) throw new IllegalArgumentException(f + " em branco");
        return v;
    }

    public static Double requirePositive(Double v, String f) {
        if (v == null || v <= 0) {
            throw new IllegalArgumentException(f + " deve ser > 0");
        }
        return v;
    }
}
