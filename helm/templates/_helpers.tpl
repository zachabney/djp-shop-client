{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "name" -}}
{{- .Values.project.name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "fullname" -}}
{{- $name := .Values.project.name -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create docker pull secret name
*/}}
{{- define "image.pullSecret.name" -}}
{{ template "fullname" . }}-regcred
{{- end -}}

{{/*
Create docker pull secret
*/}}
{{- define "image.pullSecret.config" -}}
{{- printf "{\"auths\": {\"%s\": {\"auth\": \"%s\"}}}" .Values.image.credentials.registry (printf "%s:%s" .Values.image.credentials.username .Values.image.credentials.password | b64enc) | b64enc -}}
{{- end -}}

{{/*
Get the internal port
*/}}
{{- define "service.internalPort" -}}
{{- default .Values.service.port .Values.service.internalPort -}}
{{- end -}}
